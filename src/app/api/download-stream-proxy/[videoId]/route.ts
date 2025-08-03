'use server';

import { getVideoStream } from '@/actions/aws/get-video-stream';
import { getUserBySessionEmail } from '@/actions/users-and-videos/get-user-by-email';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

//! Read the readme.md ⚠️
//! Read the readme.md ⚠️
//! Read the readme.md ⚠️

//prettier-ignore
export const GET = async (_req: NextRequest, {params}: {params: Promise<{videoId: string}>})=>{
    //* Checking Auth
    const user = await getUserBySessionEmail() //$ This will take care of authentication
    if(!user){return new NextResponse('Unauthorized', {status: 401})}

    const {videoId} = await params
    if(!videoId){return new NextResponse('Video ID not found', {status: 400})}

    //! If you want to first inform wether or not the video exists in the first place. IF NOT, just do a single Prisma query.
    // const video = await prisma.video.findFirst({
    //     where: {
    //         id: videoId,

    //     }
    // })
    // if(!video){return new NextResponse('Video not found with specified ID', {status: 404})}


    const validPurchase = await prisma.purchase.findFirst({
        where: {
            user: { id: user.id },
            video: { id: videoId },
            status: 'SUCCESS'
        },
        select: {
            video: {
                select: {
                    id: true,
                    s3VideoKey: true
                }
            }
        }
    })


    if(!validPurchase){return new NextResponse("You can't watch this video or video doesn't exist", {status: 401})}

    const stream = await getVideoStream(validPurchase.video.s3VideoKey)


    return new NextResponse(stream, {
        status: 200,
        headers: {
            'Content-Type': 'video/mp4',
            "Content-Disposition": `attachment; filename=${validPurchase.video.s3VideoKey}`
        }
    })
}
