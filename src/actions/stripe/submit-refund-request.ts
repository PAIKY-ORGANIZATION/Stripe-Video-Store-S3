"use server"

import { prisma } from "@/lib/prisma"

//% Refunds are associated with  a Stripe Session (Cart). While we don't manage the context of a cart, we need only one refund per session, because that is WHAT STRIPE ALLOWS. Maybe we could also use partial refunds (like x% of it)
//% When updating or solving the refund we will modify all purchases. This is the best for our current model.
export const submitRefundRequest = async (paymentIntentId: string)=>{

    const existingRefund = await prisma.refunds.findFirst({
        where: {
            purchases: {
                
            }
        }
    })

    //% Purchases have an optional refund relationship. We can:
        //% 1- Create the refund
        //% 2- Attach the refund Id to all purchases with the same paymentIntentId
        
    const refund = await prisma.refunds.create({
        data: {
            solved: false,
            reason: 'Requested by customeeeeer'
        }
    })

    await prisma.purchase.updateMany({
        where: {id: paymentIntentId},
        data: {refundId: refund.id}
    })

    return true
}