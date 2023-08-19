import {connect} from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/model';
import { NextRequest,NextResponse } from 'next/server';

connect();



export async function GET(request:NextRequest) {
 
    try{

        const _id=getDataFromToken(request);

        const response1=await User.findOne({_id},'connections');
        const connections=response1.connections;

        const response2=await User.find({},'_id');
        
        let getAll=[];
        for(const resp of response2){
            getAll.push(resp._id);
        }

        const nonConnection = getAll.filter(item => !connections.includes(item) && item!=_id);

        return NextResponse.json({message:"Non-connections",success:true,nonConnection});
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}