import { prisma } from "@/lib/prisma"


export const emptyDb = async ()=>{

    await prisma.video.deleteMany()

}