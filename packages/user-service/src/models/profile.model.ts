import { link } from "fs";
import mongoose from "mongoose";

export interface IUserProfile extends Document{
    userId:mongoose.Types.ObjectId;
    bio:string;
    interstes?:string[];
    picture?:string;
    website?:string;
    phoneNumber?:string;
    skills?:string[];
    education?:{
        degree:string;
        institution:string;
        yearOfGraduation:number;
    }[];
    experience?:{
        jobTitle:string;
        company:string;
        startDate:Date;
        endDate?:Date;
        description:string;
    }[];
    certifications?:{
        title:string;
        issuer:string;
        issueDate:Date;
        expirationDate?:Date;
    }[];
    socialLinks:{
        linkedin?:string;
        facebook?:string;
        twitter?:string;
        github?:string;
    };
    country:string;
    location:Location;
    notificationSettings:{
        emailNotifications:boolean;
        smsNotifications:boolean;
        pushNotifications:boolean;
    };
}



const UserProfileSchema = new mongoose.Schema<IUserProfile>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
        ref:'User'
    },
    bio:{
        type:String,
        default:''  
    },
    interstes:{
        type:[String],
        default:[]
    }

});