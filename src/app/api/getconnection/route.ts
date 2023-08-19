import {connect} from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/model';
import { NextRequest,NextResponse } from 'next/server';

connect();



export async function GET(request:NextRequest) {
 
    try{

        const _id=getDataFromToken(request);
        
        const response=await User.findOne({_id},'connections');

        return NextResponse.json({message:"Connection returned",success:true,connection:response.connections});

    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}