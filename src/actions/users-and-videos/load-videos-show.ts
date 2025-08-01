"use server"

import type { video  as  PrismaVideo} from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { getUserBySessionEmail } from "./get-user-by-email"



export const loadVideosShow = async (): Promise<PrismaVideo[]>=>{

    const allVideos = await prisma.video.findMany({})

    const user = await getUserBySessionEmail()

    if(!user) return allVideos //* If there is no user session, return all videos available for purchase.
    
    const purchases = await prisma.purchase.findMany({
        where: {userId: user.id},
        include: {video: true}
    })

    //% user.purchases looks like this: 
    //% [ { video: {. . . . . id: string} }, { video: {. . . . . id: string} }, { video: {. . . . . id: string} } ]
    const ownedVideosIdsArray: string[] = purchases.map((purchase)=> purchase.video.id)
    //% It ends like this: [ '1', '2', '3' ]

    


    //* The purpose of this is to return only videos that a logged-in user has NOT bought
    return allVideos.filter((videoObject)=>{
        if(!ownedVideosIdsArray.includes(videoObject.id)){
            return videoObject
        }
    })
    
    
    


    
}