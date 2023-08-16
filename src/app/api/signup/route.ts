import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/model";
import { NextRequest,NextResponse} from "next/server";
import bcryptjs from 'bcryptjs'


connect();



export async function POST(request:NextRequest) {
    
    try{
        const reqBody=await request.json();
        const {username,email,password,mobile}=reqBody

        
        //validation can be done here
        console.log(reqBody);

        //check if user already exists
        const user=await User.findOne({email});


        if(user){
            return NextResponse.json({error:"User already exists"},{status:400});
        }


        //hash password before saving
        const salt=await bcryptjs.genSalt(10);//salt with 10 rounds
        const hashedPassword=await bcryptjs.hash(password,salt);

    
        const newUser=new User({
            username,
            email,
            mobile,
            password:hashedPassword
        })

        const savedUser=await newUser.save();
        console.log(savedUser);
                
        return NextResponse.json({message:"User Created Successfully",success:true,savedUser});
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}   