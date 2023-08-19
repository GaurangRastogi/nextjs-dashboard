import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/model';
import { NextRequest,NextResponse } from 'next/server';

connect();



export async function POST(request:NextRequest) {
 
    try{
        const req=await request.json();
        console.log("hello",req);
        const ids=req.ids;
        
        let ans=[];

        for await(const id of ids){
            const response=await User.findOne({_id:id},'username professionalDetail profilePhoto');
            ans.push(response);
        }
        
        return NextResponse.json({message:"Connection returned",success:true,detail:ans});

    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}