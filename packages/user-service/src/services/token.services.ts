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
    saveRefreshToken(userId: string, refreshToken: string): Promise<IRefreshToken>;
    findRefreshToken(userId: string, refreshToken: string): Promise<IRefreshToken | null>;
    verifyAccessToken(token: string): Promise<Jwt | null>;
    verifyRefreshToken(token: string): Promise<Jwt | null>;
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
            expiresIn : "7d"
        });
    }

    async generateRefreshToken(user: IUser): Promise<string> {
        const refreshToken = uuidv4();
        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds()+parseInt(config.jwt.refreshTokenExpiry as string)); 
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


}