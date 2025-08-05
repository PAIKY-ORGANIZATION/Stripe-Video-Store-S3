"use server"

import { prisma } from "@/lib/prisma"
import { getUserBySessionEmail } from "../users-and-videos/get-user-by-email"
import { sendEmail } from "../brevo/send-email"

//% Refunds are associated with  a Stripe Session (Cart). While we don't manage the context of a cart, we need only one refund per session, because that is WHAT STRIPE ALLOWS. We might also need partial refunds for a single charge (like x% of it)
//% When updating or solving the refund we will modify all purchases. This is the best for our current model.
export const submitRefundRequest = async (paymentIntentId: string)=>{
    //* Auth
    const user = await getUserBySessionEmail()
    if(!user) return false

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
    //// We are not checking if the videos belong to the user who requested this refund
    //// We could: Pass an array of videosIDs and make sure that there matches with VideoID, 
    
    //* Check if payment intent belongs to user on any of their purchases (checking if the videos belong to the user who requested this refund
    const userData = await prisma.user.findFirst({
        where: {
            id: user.id
        },
        select: {
            purchases: {
                select: {
                    paymentIntentId: true
                }
            }
        }
    })
    const paymentIntentIdBelongsToUser = userData?.purchases.map((purchase)=>{
        if(purchase.paymentIntentId === paymentIntentId) return true    
    })
    if(!paymentIntentIdBelongsToUser) return false


    //% Purchases have an optional refund relationship. We can:
        //% 1- Create the refund
        //% 2- Attach the refund Id to all purchases with the same paymentIntentId
        
    const refund = await prisma.refunds.create({ //* Create the refund
        data: {
            solved: false,
            reason: 'Requested by customeeeeer'
        }
    })

    //* Actually linking purchases to their refunds ✨
    await prisma.purchase.updateMany({
        where: {paymentIntentId: paymentIntentId},
        data: {refundId: refund.id,} //! Still don't mark as "REFUNDED" until the refund is approved.
    })

    //* Send email to support team
    await sendEmail({
        subject: 'Received a refund',
        content: 'Received refund request from: ' + user.email,
        receiverEmail: process.env.DEFAULT_BREVO_SENDER_EMAIL!, //$ (Self)
    })

    return true
}