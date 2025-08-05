"use server"

import type { video  as  PrismaVideo} from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { getUserBySessionEmail } from "./get-user-by-email"



export const loadVideosShow = async (): Promise<PrismaVideo[]>=>{

    
    const user = await getUserBySessionEmail()
    
    if(!user)  {
        return  await prisma.video.findMany({}) //* If there is no user session, return all videos available for purchase.
    } 
    
    //* ⬇️⬇️⬇️ The purpose of this is to return only videos that a logged-in user has NOT bought. ⬇️⬇️⬇️
    const purchasedVideoIds  = await prisma.purchase.findMany({
        where: {userId: user.id, status: "SUCCESS"},
        select: {video: {
            select: {id: true}
        }}
    })

    //% user.purchases looks like this: 
    //% [ { video: {. . . . . id: string} }, { video: {. . . . . id: string} }, { video: {. . . . . id: string} } ]
    const excludeVideosIdS: string[] = purchasedVideoIds .map((purchase)=> purchase.video.id)
    //% It ends like this: [ '1', '2', '3' ]

    

    return prisma.video.findMany({ //* Return all video (excluding the ones purchased by the user)
        where: {
            id: {
                notIn: excludeVideosIdS
            }
        }
    })
    


    
}