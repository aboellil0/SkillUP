import jwt,{ Jwt } from "jsonwebtoken";
import User,{ IUser } from "../models/user.model";
import RefreshToken,{ IRefreshToken } from "../models/refreshToken.model";
import config from "../config";
import { v4 as uuidv4 } from 'uuid';
import { Types } from "mongoose";


export interface TokenPayload {
    id: string;
    email: string;
    role: string;
 }

export interface ITokenService {
    generateAccessToken(user: IUser): string;
    generateRefreshToken(user: IUser): Promise<string>;
    verifyAccessToken(token: string): Promise<Jwt | null>;
    verifyRefreshToken(token: string,userId :string): Promise<IRefreshToken | null>;
    removeRefreshToken(userId: string, refreshToken: string):Promise<boolean>;
}

export class TokenService implements ITokenService{
    generateAccessToken(user: IUser): string {
        const payload : TokenPayload = {
            id : (user._id as Types.ObjectId).toString(),
            email : user.email,
            role : user.role
        }

        return jwt.sign(payload,config.jwt.accessTokenSecret,{
            expiresIn : parseInt(config.jwt.refreshTokenExpiry)
        });
    }

    async generateRefreshToken(user: IUser): Promise<string> {
        const refreshToken = uuidv4();
        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds()+parseInt(config.jwt.refreshTokenExpiry)); 
        var userId = (user._id as Types.ObjectId).toString();
        var token = new RefreshToken({
            userId: userId,
            token: refreshToken,
            expiresAt: expiresAt
        });
        await token.save().then((token) => {
            console.log("Refresh token saved successfully:", token);
        }
        ).catch((error) => {
            console.error("Error saving refresh token:", error);
        });
        return refreshToken.toString();
        
    }

    verifyAccessToken(token: string): Promise<Jwt | null> {
       try {
            const decoded = jwt.verify(token, config.jwt.accessTokenSecret) as Jwt;
            console.log("Decoded access token:", decoded);
            return Promise.resolve(decoded);
        }catch(error){
            console.log("error with verfiying access token:",error);
            return Promise.resolve(null);
        }
    }

    async verifyRefreshToken(refreshtokenToken: string,userId :string): Promise<IRefreshToken | null> {
        try{
            const refreshToken = await RefreshToken.findOne({
                token: refreshtokenToken,
                userId: userId,
                isRevoked: false,
                expiresAt: { $gt: new Date() } // Check if the token is not expired
            });
            if(refreshToken == null){
                console.log("Refresh token not found or revoked");
                return null;
            }else{
                return refreshToken;
            }
        }catch(error){
            console.error("Error verifying refresh token:", error);
            return null;
        }
    }

    async removeRefreshToken(userId: string, refreshtokenToken: string): Promise<boolean> {
        try{
            const refreshToken = await RefreshToken.findOne({
                token: refreshtokenToken,
                userId: userId
            }) ;
            if(refreshToken == null){
                console.log("Refresh token not found or already revoked");
                return false;
            }
            refreshToken.isRevoked = true;
            await refreshToken.save();
            return true;
        }
        catch(error){
            console.error("Error removing refresh token:", error);
            return false;
        }
    }
}