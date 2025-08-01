import { getUserBySessionEmail } from "@/actions/users-and-videos/get-user-by-email";
import { prisma } from "@/lib/prisma";
import { s3Client } from "@/lib/s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server"

//! Read the readme.md ⚠️
//! Read the readme.md ⚠️
//! Read the readme.md ⚠️




export const GET = async (_req: NextRequest, {params}: {params: Promise<{videoId: string}>})=>{
    //* Checking Auth
    const user = await getUserBySessionEmail() //$ This will take care of authentication
    if(!user){return new NextResponse('Unauthorized', {status: 401})}

    const {videoId} = await params
    if(!videoId){return new NextResponse('Video ID not found', {status: 400})}

    //* Find video in prisma
    const video = await prisma.video.findFirst({ where: {id: videoId}})
    if(!video){return new NextResponse('Video not found with specified ID', {status: 404})}

    const getObjectCommand = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: video.s3VideoKey,
    })
    
    const {Body, } = await s3Client.send(getObjectCommand) 


    return new NextResponse(Body as ReadableStream, {
        status: 200,
        headers: {
            'Content-Type': 'video/mp4',
            "Content-Disposition": `attachment; filename=${video.s3VideoKey}`
        }
    })
}