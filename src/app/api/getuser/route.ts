import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/model";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request:NextRequest) {

    try{
        const userId=getDataFromToken(request);
        
        const user=await User.findOne({_id:userId});

        return NextResponse.json({message:"Image Updated Successfully",success:true,user});
    }

    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }

}
