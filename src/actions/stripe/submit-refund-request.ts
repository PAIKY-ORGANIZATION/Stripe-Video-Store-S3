"use server"

import { prisma } from "@/lib/prisma"

export const submitRefundRequest = async (paymentIntentId: string)=>{

    //% Since we don't handle the concept of a cart, we will create multiple refunds for multiple purchases linked to a single Stripe cart.
    //% When updating or solving the refund we will modify all purchases. This is the best for our current model.
    const purchasesToRefund = await prisma.purchase.findMany({
        where: {paymentIntentId: paymentIntentId},
        select: {id: true}
    })

    const purchasesToRefundIds = purchasesToRefund.map((purchasesToRefund)=> purchasesToRefund.id)

    //* Link all  purchases related to the intent ID with a refund
    for(const id of purchasesToRefundIds){
        
        const existingRefund = await prisma.refunds.findFirst({
            where: {
                purchaseId: id
            }
        })
        if (existingRefund) return null

        await prisma.refunds.create({
            data: {
                purchaseId: id,
                solved: false,
                // stripeRefundId //! The Stripe refund won't be created now. Update with the stripeRefundId later
            }
        })
    }

    return true
}