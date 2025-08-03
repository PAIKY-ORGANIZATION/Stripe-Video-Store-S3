import { prisma } from "@/lib/prisma"

export const manageRefundRequests = async ()=>{

    const refunds = await prisma.refunds.findMany({  

    })


    console.log(refunds);
    
    

    return
}