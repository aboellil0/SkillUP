import { Request, Response } from "express";
import authService, { AuthService } from "../services/auth.service";
import tokenService, { TokenService } from "../services/token.service";
import { error } from "console";
import User,{IUser} from "../models/user.model"
import userService ,{ UserService } from "../services/user.service";


export class UserController{
    async getCurrentUser(req:Request,res:Response):Promise<void>{
        try{
            const userId = (req as any) 
            const user =  await userService.getUserById(userId)
        }catch(error){
            console.log("getCurrentUser has error : " ,error);
            res.status(400).json({success:false,error });
        }
    }

    async getUserById(req:Request,res:Response):Promise<void>{
        try{
            const userId = req.params.id
            const user =  await userService.getUserById(userId)
            res.status(200).json({success:true,user});
        }catch(error){
            console.log("getUserById has error : " ,error);
            res.status(400).json({success:false,error });
        }
    }
    async getAllUsers(req:Request,res:Response):Promise<void>{
        try{
            const users =  await userService.getUserById(req.params.id)
            res.status(200).json({success:true,users});
        }catch(error){
            console.log("getAllUsers has error : " ,error);
            res.status(400).json({success:false,error });
        }
    }
}