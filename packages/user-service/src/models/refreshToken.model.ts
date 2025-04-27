import mongoose, { Schema } from "mongoose";

export interface IRefreshToken extends Document{
    userId: mongoose.Types.ObjectId;
    token: string;
    createdByIP: string;
    revokedByIP:string;
    replacedtoken?:mongoose.Types.ObjectId;
    isRevoked:boolean;
    createdAt:Date;
    expiresAt:Date;
    revokedAt?:Date;
}

const RefreshToken = new Schema<IRefreshToken>({
   userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdByIP:{
        type:String,
        required:true
    },
    revokedByIP:{
        type:String,
        required:true
    },
    replacedtoken:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'RefreshToken'
    },
    isRevoked:{
        type:Boolean,
        default:function(){return (this.expiresAt>= new Date())}
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    expiresAt:{
        type:Date,
        required:true
    },
    revokedAt:{
        type:Date,
        default: ()=>new Date(Date.now() + 30*24*60*60*1000) // 30 days from now
    }
},{
    timestamps:true
});

export default mongoose.model<IRefreshToken>('RefreshToken', RefreshToken);