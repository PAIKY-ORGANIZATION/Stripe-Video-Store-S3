"use server"

import { prisma } from "@/lib/prisma"

//% Refunds are associated with  a Stripe Session (Cart). While we don't manage the context of a cart, we need only one refund per session, because that is WHAT STRIPE ALLOWS. Maybe we could also use partial refunds (like x% of it)
//% When updating or solving the refund we will modify all purchases. This is the best for our current model.
export const submitRefundRequest = async (paymentIntentId: string)=>{

    //*  Since I'm not too familiar with "Some", I'll leave this NOTE:
    //* To know if a refund is associated with a purchase with the paymentIntentId being requested for refund, we can use "SOME":
    //$ "some": Checks if at least one related record satisfies the given condition.
    //$ "every": All related records must match the condition.
    //$ "none": No related record must match the condition.

    
    //*  Know if a refund is associated with a purchase with the paymentIntentId being requested for refund.
    const existingPurchaseWithRefund = await prisma.refunds.findFirst({
        where: {
            purchases: {
                some: {
                    paymentIntentId
                }
            }
        }
    })

    if(existingPurchaseWithRefund) return false

    //% Purchases have an optional refund relationship. We can:
        //% 1- Create the refund
        //% 2- Attach the refund Id to all purchases with the same paymentIntentId
        
    const refund = await prisma.refunds.create({
        data: {
            solved: false,
            reason: 'Requested by customeeeeer'
        }
    })

    const updatedPurchases = await prisma.purchase.updateManyAndReturn({
        where: {paymentIntentId: paymentIntentId},
        data: {refundId: refund.id}
    })

    return true
}