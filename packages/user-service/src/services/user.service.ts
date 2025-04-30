import { Jwt } from "jsonwebtoken";
import User,{ IUser } from "../models/user.model";
import RefreshToken,{ IRefreshToken } from "../models/refreshToken.model";
import config from "../config";
import { v4 as uuidv4 } from 'uuid';
import TokenService,{ ITokenService } from "./token.service";
import { error } from "console";


export class UserService{
    async getUserById(id:string) :Promise<IUser|null>{
        return User.findById(id);
    }
    async deletUser(id:string):Promise<Boolean>{
        const resuult =  User.findByIdAndDelete(id); 
        return !!resuult;
    }
    async updateUSer(id:string,userDTO:Partial<IUser>):Promise<IUser|null>{
        return User.findByIdAndUpdate(id,userDTO,{new:true});
    }
}

export default new UserService();