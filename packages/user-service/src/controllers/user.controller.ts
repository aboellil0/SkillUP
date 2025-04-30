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
}