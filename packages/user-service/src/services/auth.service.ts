import { Jwt } from "jsonwebtoken";
import User,{ IUser } from "../models/user.model";
import RefreshToken,{ IRefreshToken } from "../models/refreshToken.model";
import config from "../config";
import { v4 as uuidv4 } from 'uuid';
import TokenService,{ ITokenService } from "./token.service";
import { error } from "console";

interface AuthResult {
    userDTO: {
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      role: string
    },
    tokens: {
      accessToken: string,
      refreshToken: string
    }
  }

export interface IAuthService {
    registerUser(email:string, password:string, firstName:string, lastName:string, role:string): Promise<AuthResult>;
    validateUser(email: string, password: string): Promise<AuthResult>;
    refreshAccessToken(userId: string, refreshToken: string): Promise<AuthResult>;
}
export class AuthService implements IAuthService{
    async registerUser(email:string, password:string, firstName:string, lastName:string, role:string): Promise<AuthResult> {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const newUser = new User({
          email:email,
          password:password,
          firstName:firstName,
          lastName:lastName,
          role:role,
          
        });
        await newUser.save().then((newUser)=>{
          console.log("new user saved succesfully");
        }).catch((error)=> {
          console.log("new user not saved :",error);
        });
       
        const token = TokenService.generateAccessToken(newUser);
        const refreshToken = await TokenService.generateRefreshToken(newUser);

        return {
          userDTO: {
            id: newUser._id.toString(),
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role
          },
          tokens: {
            accessToken: token,
            refreshToken: refreshToken
          }
        };
    }
    async validateUser(email: string, password: string): Promise<AuthResult> {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const IsValid= await user.comparePassword(password);
      if (!IsValid) {
        throw new Error("Invalid password");
      }
      const token = TokenService.generateAccessToken(user);
      const refreshToken = await TokenService.generateRefreshToken(user);
      return {
        userDTO: {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        tokens: {
          accessToken: token,
          refreshToken: refreshToken
        }
      };
    }

    async refreshAccessToken(userId: string, refreshToken: string): Promise<AuthResult>{
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const isValid = await TokenService.verifyRefreshToken(userId,refreshToken);
        if (!isValid) {
            throw new Error("Invalid refresh token");
        }
        const newAccessToken = TokenService.generateAccessToken(user);
        await TokenService.removeRefreshToken(userId,refreshToken);
        const newRefreshToken = await TokenService.generateRefreshToken(user);
        return {
            userDTO: {
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            tokens: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            }
        };
    }
    async LogOutUser(userId:string,refreshToken:string):Promise<void>{
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const isValid = await TokenService.verifyRefreshToken(userId,refreshToken);
        if (!isValid) {
            throw new Error("Invalid refresh token");
        }
        await TokenService.removeRefreshToken(userId,refreshToken);
    }
}

export default new AuthService();