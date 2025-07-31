import { getUserBySessionEmail } from "@/actions/get-user-by-email";
import { NextRequest, NextResponse } from "next/server"

//! Read the readme.md ⚠️
//! Read the readme.md ⚠️
//! Read the readme.md ⚠️


export const GET = async (req: NextRequest, {params}: {params: Promise<{videoId: string}>})=>{

    const user = await getUserBySessionEmail() //$ This will take care of authentication
    if(!user){return new NextResponse('Unauthorized', {status: 401})}

    const {videoId} = await params

    console.log({videoId});
    
    

    return new NextResponse('DONWLOAD-SERVED LOL', {
        status: 200,
        headers: {
            'Content-Type': 'plain/text',
            "Content-Disposition": `attachment; filename=${videoId}.txt`
        }
    })
}