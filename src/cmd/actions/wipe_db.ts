import { prisma } from "@/lib/prisma"


export const wipeDb = async ()=>{

    await prisma.video.deleteMany()
    await prisma.user.deleteMany()
    await prisma.purchase.deleteMany()
    await prisma.refunds.deleteMany()
}