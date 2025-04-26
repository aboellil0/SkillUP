import { link } from "fs";
import mongoose from "mongoose";

export interface IProfile extends Document{
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
    preferredLanguage:string;
    timezone:string;
    location:Location;
    notificationSettings:{
        emailNotifications:boolean;
        smsNotifications:boolean;
        pushNotifications:boolean;
    };
}



const ProfileSchema = new mongoose.Schema<IProfile>({
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
    },
    picture:{
        type:String,
        default:''
    },
    website:{
        type:String,
        default:''
    },
    phoneNumber:{
        type:String,
        default:''
    },
    skills:{
        type:[String],
        default:[]
    },
    education:[{
        degree:{ type:String},
        institution:{ type:String},
        yearOfGraduation:{ type:Number}
    }],
    experience:[{
        jobTitle:{ type:String},
        company:{ type:String},
        startDate:{ type:Date},
        endDate:{ type:Date},
        description:{ type:String}
    }],
    socialLinks:{
        linkedin:{ type:String},
        facebook:{ type:String},
        twitter:{ type:String},
        github:{ type:String}
    },
    country:{
        type:String,
        default:''
    },
    preferredLanguage:{
        type:String,
        default:''
    },
    timezone:{
        type:String,
        default:''
    },
    location:{
        type:location,
    },
    notificationSettings:{
        
        emailNotifications:{type:Boolean, default:true},
        smsNotifications:{type:Boolean, default:true},
        pushNotifications:{type:Boolean, default:true},
    }
},
{
    timestamps:true
});


export default mongoose.model<IProfile>('Profile',ProfileSchema);