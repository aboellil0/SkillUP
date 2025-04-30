import { Request, Response } from "express";
import authService, { AuthService } from "../services/auth.service";
import tokenService, { TokenService } from "../services/token.service";
import { error } from "console";
import User,{IUser} from "../models/user.model"



export class AuthController{
    async registerUser(req:Request,res:Response):Promise<void>{
        try{
            const {
                email,password,firstName,lastName,role
            } = req.body;
            const authResponse = await authService.registerUser(email,password,firstName,lastName,role);

            res.status(201).json(authResponse);
        }catch(error)
        {
            console.log(error);
            res.status(400).json(error);
        }
    }

    async loginUser(req:Request,res:Response):Promise<void>{
        try{
            const {email,password} = req.body;
            const authResponse = await authService.validateUser(email,password);
            this.setRefreshTokenCookie(res, authResponse.tokens.refreshToken);
            res.status(200).json(authResponse);
        }catch(error){
            console.log(error);
            res.status(400).json(error);
        }
    }

    async LogOutUser(req:Request,res:Response):Promise<void>{
        try{
            const UserId = (req as any).user.id
            const refershTokenFromCokkie = req.cookies.refreshToken;
            const accessTokenFromHeader = req.headers.authorization?.split(" ")[1];
            const isAccessTokenValid = await tokenService.verifyAccessToken(accessTokenFromHeader as string);
            if(!isAccessTokenValid){
                res.status(401).json({message:"Invalid access token"});
            }
            if(refershTokenFromCokkie != null){
                await authService.LogOutUser(UserId,refershTokenFromCokkie);
                res.clearCookie('refreshToken');
            }

            res.status(200).json({message:"User logged out successfully"});
        }catch(error){
            console.log(error);
            res.status(400).json(error);
        }
    }

    private setRefreshTokenCookie(res: Response, token: string): void {
        res.cookie('refreshToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 30 * 24 * 60 * 60 * 1000 // 7 days
        });
      }
}   

export default new AuthController();