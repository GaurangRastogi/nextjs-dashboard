import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide an username"]
    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:true
    },
    mobile:{
        type:String,
        required:[true,"Please provide a number"]
    },
    password:{
        type:String,
        required:[true,"Please provide a password"]
    },
    profilePhoto:{
        type:String,
        default:""
    },
    about:{
        type:String
    },
    skills:[{
        type:String
    }],
    professionalDetail:{
        jobType:{//full time internship
            type:String,
            default:"Job Type"
        },
        job:{ //company name
            type:String,
            default:"Job"
        }
    },
    certification:[
        {
            name:{
                type:String
            },
            platform:{
                type:String
            }
        }
    ],
    experience:[
        {
            name:{
                type:String
            },
            role:{
                type:String,
            },
            roleType:{
                type:String,//full time,internship
            },
            location:{
                type:String
            },
            startDate:{
                type:Date
            },
            endDate:{
                type:Date//if undefined (then present)
            }
        }
    ],
    education:[
        {
            degree:{
                type:String
            },
            college:{
                type:String
            },
            summary:{
                type:String
            },
            startDate:{
                type:Date
            },
            endDate:{
                type:Date
            }
        }
    ],
    connections:[
        {
            type:String //userId's of connections
        }
    ]
});


const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;