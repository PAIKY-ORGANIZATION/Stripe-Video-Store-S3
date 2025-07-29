"use server"

import { prisma } from "@/lib/prisma"



export const loadVideosShow = async ()=>{

    return  await prisma.video.findMany({ //! Just retrieve the video as is to keep a single type.
        // select: {
        //     title: true,
        //     price: true,
        //     views: true,
        //     s3ThumbnailKey: true
        // }
    })
    
}