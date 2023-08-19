import {connect} from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/model';
import { NextRequest,NextResponse } from 'next/server';

connect();



export async function POST(request:NextRequest) {
 
    try{

        const _id=getDataFromToken(request);

        const response=await request.json();

        const newConnection=response.id;
        
        //two way deletion
        const update1=await User.findByIdAndUpdate({_id},{ $pull: {connections:newConnection} } );
        const update2=await User.findByIdAndUpdate({_id:newConnection},{$pull:{connections:_id}});

        return NextResponse.json({message:"Connection Removed",success:true});

    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}