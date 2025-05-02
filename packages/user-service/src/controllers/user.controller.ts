import { Request, Response } from "express";
import authService, { AuthService } from "../services/auth.service";
import tokenService, { TokenService } from "../services/token.service";
import { error } from "console";
import User,{IUser} from "../models/user.model"
import userService ,{ UserService } from "../services/user.service";
import authController, { AuthController } from "./auth.controller";


export class UserController{


    async getCurrentUser(req:Request,res:Response):Promise<void>{
        try{
            // verfication of token
            const refershTokenFromCokkie = req.cookies.refreshToken;
            const accessTokenFromHeader = req.headers.authorization?.split(" ")[1];
            if(!refershTokenFromCokkie){
                res.status(401).json({message:"No refresh token in cookie"});
            }
            const isAccessTokenValid = await tokenService.verifyAccessToken(accessTokenFromHeader as string);
            if(!isAccessTokenValid){
                res.status(401).json({message:"Invalid access token"});
            }

            const userId = req.params.id
            const user =  await userService.getUserById(userId)
            if(!user){
                res.status(404).json({success:false,message:"User not found"});
            }
            res.status(200).json({success:true,data:{
                user:{
                    id:user?._id,
                    name:user?.firstName + " " + user?.lastName,
                    email:user?.email,
                    phone:user?.phoneNumber,
                    role:user?.role,
                    createdAt:user?.createdAt,
                    updatedAt:user?.updatedAt
                }
            }});
        }catch(error){
            console.log("getUserById has error : " ,error);
            res.status(400).json({success:false,error });
        }
    }

    async updateUser(req:Request,res:Response):Promise<void>{
        try{
            // verfication of token
            const refershTokenFromCokkie = req.cookies.refreshToken;
            const accessTokenFromHeader = req.headers.authorization?.split(" ")[1];
            if(!refershTokenFromCokkie){
                res.status(401).json({message:"No refresh token in cookie"});
            }
            const isAccessTokenValid = await tokenService.verifyAccessToken(accessTokenFromHeader as string);
            if(!isAccessTokenValid){
                res.status(401).json({message:"Invalid access token"});
            }

            const userId = req.params.id
            const {firstName,lastName,phoneNumber} = req.body
            const user =  await userService.updateUSer(userId,{firstName,lastName,phoneNumber})
            if(!user){
                res.status(404).json({success:false,message:"User not found"});
            }
            res.status(200).json({success:true,data:{
                user:{
                    id:user?._id,
                    name:user?.firstName + " " + user?.lastName,
                    email:user?.email,
                    phone:user?.phoneNumber,
                    role:user?.role,
                    createdAt:user?.createdAt,
                    updatedAt:user?.updatedAt
                }
            }});
        }catch(error){
            console.log("updateUser has error : " ,error);
            res.status(400).json({success:false,error });
        }
    }
    async deleteUser(req:Request,res:Response):Promise<void>{
        try{
            // verfication of token
            const refershTokenFromCokkie = req.cookies.refreshToken;
            const accessTokenFromHeader = req.headers.authorization?.split(" ")[1];
            if(!refershTokenFromCokkie){
                res.status(401).json({message:"No refresh token in cookie"});
            }
            const isAccessTokenValid = await tokenService.verifyAccessToken(accessTokenFromHeader as string);
            if(!isAccessTokenValid){
                res.status(401).json({message:"Invalid access token"});
            }
            
            
            const userId = req.params.id
            const user =  await userService.deletUser(userId)
            if(!user){
                res.status(404).json({success:false,message:"User not found"});
            }
            res.status(200).json({success:true,"message":"User deleted successfully"});
        }catch(error){
            console.log("deleteUser has error : " ,error);
            res.status(400).json({success:false,error });
        }
    }
}

export default new UserController();