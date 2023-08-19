import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/model";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();



export async function POST(request:NextRequest) {

    try{
        const userId=getDataFromToken(request);

        const data=await request.json();

        // console.log("data",data)

        const uploadImage=await User.findByIdAndUpdate({_id:userId},{profilePhoto:data.url});

        return NextResponse.json({message:"Image Updated Successfully",success:true});
    }

    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }

}
