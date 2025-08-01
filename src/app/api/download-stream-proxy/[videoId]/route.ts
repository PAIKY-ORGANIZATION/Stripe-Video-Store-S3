"use server"

import { getVideoStream } from "@/actions/aws/get-video-stream";
import { getUserBySessionEmail } from "@/actions/users-and-videos/get-user-by-email";
import { prisma } from "@/lib/prisma";
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

    const stream = await getVideoStream(video.s3VideoKey)


    return new NextResponse(stream, {
        status: 200,
        headers: {
            'Content-Type': 'video/mp4',
            "Content-Disposition": `attachment; filename=${video.s3VideoKey}`
        }
    })
}