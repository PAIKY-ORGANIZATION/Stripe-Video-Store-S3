"use server"

import type { video  as  PrismaVideo } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"



export const loadVideosShow = async (): Promise<PrismaVideo[]>=>{

    return  await prisma.video.findMany({ //! Just retrieve the video as is to keep a single type.
        // select: {
        //     title: true,
        //     price: true,
        //     views: true,
        //     s3ThumbnailKey: true
        // }
    })
    
}