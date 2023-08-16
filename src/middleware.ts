import { NextResponse,NextRequest } from "next/server";


//This function can be marked 'async' if using 'await' inside
export function middleware(request:NextRequest){
    const path=request.nextUrl.pathname;

    const isPublicPath = (path==="/login") || (path==='/signup')

    const token=request.cookies.get('token')?.value||'';

    console.log(isPublicPath,token)

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl));
    }
    
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl))
    }
    return;
}


//See "matching paths" below to learn more
export const config={
    matcher:[
        '/',
        '/login',
        '/signup',
        '/connections'
    ]
}