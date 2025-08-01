"use server"

import type { video  as  PrismaVideo} from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { getUserBySessionEmail } from "./get-user-by-email"



export const loadVideosShow = async (): Promise<PrismaVideo[]>=>{

    const allVideos = await prisma.video.findMany({})

    const user = await getUserBySessionEmail()

    if(!user) return allVideos //* If there is no user session, return all videos available for purchase.
    
    //* ⬇️⬇️⬇️ The purpose of this is to return only videos that a logged-in user has NOT bought. ⬇️⬇️⬇️
    const purchases = await prisma.purchase.findMany({
        where: {userId: user.id, success: true},
        include: {video: true}
    })

    //% user.purchases looks like this: 
    //% [ { video: {. . . . . id: string} }, { video: {. . . . . id: string} }, { video: {. . . . . id: string} } ]
    const ownedVideosIdsArray: string[] = purchases.map((purchase)=> purchase.video.id)
    //% It ends like this: [ '1', '2', '3' ]

    


    return allVideos.filter((videoObject)=>{
        if(!ownedVideosIdsArray.includes(videoObject.id)){
            return videoObject
        }
    })
    
    
    


    
}