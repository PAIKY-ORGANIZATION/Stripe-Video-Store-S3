"use server"

import { prisma } from "@/lib/prisma"



export const loadVideosShow = async ()=>{

    return  await prisma.video.findMany({
        select: {
            title: true,
            price: true,
            views: true,
            
            
        }
    })
    
}