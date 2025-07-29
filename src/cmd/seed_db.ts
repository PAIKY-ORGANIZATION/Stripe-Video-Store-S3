import { prisma } from "@/lib/prisma"
import { videos } from "@/lib/products"


export const seedDb = async ()=>{

    for (const video of videos){
        await prisma.video.createMany({
            data: video
        })
    }


}