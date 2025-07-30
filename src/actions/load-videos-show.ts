"use server"

import type { video  as  PrismaVideo} from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { getUserBySessionEmail } from "./get-user-by-email"



export const loadVideosShow = async (): Promise<PrismaVideo[]>=>{

    const allVideos = await prisma.video.findMany({})

    const user = await getUserBySessionEmail()

    if(!user) return allVideos //* If there is no user session, return all videos available for purchase.
    



    const userVideos = await prisma.video.findMany({
        where: {
            id: {
                in: user.videos.map(video => video.id)
            }
        }
    })

    return userVideos
    
    
    


    
}