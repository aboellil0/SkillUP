import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user.model';
import { error } from 'console';


export const authonticateJWT = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            res.status(401).json({success:false,error:"no token provided"});
            return;
        }

        const token =  authHeader.split(' ')[1];
        const decoded = jwt.verify(token,config.jwt.accessTokenSecret) as {id:string};

        const user = await User.findById(decoded.id);
        if (!user){
            res.status(401).json({success:false,error:"user not found"});
            return;
        }
        (req as any).user = {
            id:user?._id,
            name:user?.firstName + " " + user?.lastName,
            email:user?.email,
            phone:user?.phoneNumber,
            role:user?.role,
            createdAt:user?.createdAt,
            updatedAt:user?.updatedAt
        }

        next();
    }catch (error) {
        res.status(401).json(error);
    }
};


export const authorizeRoles = (roles:string[])=>{
    return (req:Request,res:Response,next:NextFunction):void=>{
        if (!roles.includes((req as any).user.role)){
            res.status(403).json({
                success:false,
                error: "not authorized roles"
            });
            return;
        }
        next();
    };
};
