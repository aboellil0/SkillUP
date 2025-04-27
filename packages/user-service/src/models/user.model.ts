import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { promises } from "dns";

export interface IUser extends Document{
    _id:mongoose.Types.ObjectId;
    email:string;
    password?:string;
    firstName:string;
    lastName:string;
    phoneNumber?:string;
    role: 'student' | 'instructor' | 'admin' | 'superadmin';
    isEmailVerfied:boolean;
    googleId?:string;
    createdAt:Date;
    updatedAt:Date;
    comparePassword(CredintialPassword:string):Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate:{
            validator:(value:string) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message:"Invalid email format"
        }
    },
    password:{
        type:String,
        required:function(){return this.googleId == null}, // password is required if googleId is not provided
        validate:{
            validator:(value:string) => {
                return value.length >= 6;
            }
        }
    },
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:['student','instructor','admin','superadmin'],
        default:'student'
    },
    phoneNumber:{
        type:String
    },
    isEmailVerfied:{
        type:Boolean,
        default:false
    },
    googleId:{
        type:String,
        unique:true,
        sparse:true
    }
},
{
    timestamps:true
});

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password!, 10);
    }
    next();
});


userSchema.methods.comparePassword = async function (CredintialPassword:string): Promise<boolean> {
    if (this.password == null) return false;
    return await bcrypt.compare(CredintialPassword, this.password);
}

export default mongoose.model<IUser>("User", userSchema);