"use server"
import {v2 as cloudinary} from 'cloudinary';
import axios from 'axios';


const cloudinaryConfig=cloudinary.config({
    cloud_name:process.env.NEXT_CNAME!,
    api_key:process.env.NEXT_CAPI_KEY!,
    api_secret:process.env.NEXT_CAPI_SECRET!,
    secure:true
});



export async function  getSignature() {
    
    const timestamp=Math.round(new Date().getTime()/1000).toString();
    const signature=cloudinary.utils.api_sign_request(
        {timestamp,folder:'next'},
        cloudinaryConfig.api_secret!
    )

    return {timestamp,signature};
}

export async function  saveToDatabase({public_id,version,signature}:any) {
    
    const expectedSignature=cloudinary.utils.api_sign_request(
        {public_id,version},
        cloudinaryConfig.api_secret!
    )

    if(expectedSignature===signature){
        console.log({public_id});
    }
}



export async function upload(formData:FormData) {

    
    
    const endpoint=process.env.NEXT_PUBLIC_CURL!;

    const response=await fetch(endpoint,{
        method:"post",
        body:formData
    })

    const data=await response.json();
    
    return data.url;
    
}