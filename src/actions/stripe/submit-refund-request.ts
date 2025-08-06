//% Refunds are associated with  a Stripe Session (Cart). While we don't manage the context of a cart, we need only one refund per session, because that is WHAT STRIPE ALLOWS. We might also need partial refunds for a single charge (like x% of it)
//% When updating or solving the refund we will modify all purchases. This is the best for our current model.


"use server"

import { prisma } from "@/lib/prisma"
import { getUserBySessionEmail } from "../users-and-videos/get-user-by-email"
import { sendEmail } from "../brevo/send-email"
import { findDisputeByPaymentIntent } from "./find-dispute-by-payment-intent"


export const submitRefundRequest = async (paymentIntentId: string): Promise <ActionResponse>=>{
    try{

        //* Auth
        const user = await getUserBySessionEmail()
        if(!user) throw new Error('User not found')
    
        //*  If a refund exists with this paymentId, THROW
        await _findExistingPurchaseWithRefund(paymentIntentId)

    
        
        //* If payment intent doesn't belong to user on any of their purchases, THROW 
        await _paymentIntentBelongsToUser(paymentIntentId, user.id)

        
        const hasDispute = await findDisputeByPaymentIntent(paymentIntentId)  
        if(hasDispute) throw new Error ('Charge has a dispute') //! In Stripe, you cannot refund a charge that has a dispute.
    
    
        await _registerRequest(paymentIntentId)
    
    
        //* Send email to support team
        await _sendEmail(user.email)


        return {success: true, message: 'Refund request submitted'}
        
    }catch(e){
        if(e instanceof Error){ return {success: false, message: e.message,}}
        else {
            console.error('UNCAUGHT EXCEPTION:', e)
            return {success: false, message: 'An error occurred'}
        }
    }

}


const _findExistingPurchaseWithRefund = async (paymentIntentId: string)=>{
    
    //*  Since I'm not too familiar with "Some", I'll leave this NOTE:
    //* To know if a refund is associated with a purchase with the paymentIntentId being requested for refund, we can use "SOME":
    //$ "some": Checks if at least one related record satisfies the given condition.
    //$ "every": All related records must match the condition.
    //$ "none": No related record must match the condition.

    const existingPurchaseWithRefund = await prisma.refunds.findFirst({
        where: {
            purchases: {
                some: { paymentIntentId }
            }
        }
    })
    if(existingPurchaseWithRefund) throw new Error('Refund already requested')
}




const _paymentIntentBelongsToUser = async (paymentIntentId: string, userId: string) =>{
    const paymentIntentIdBelongsToUser = await prisma.purchase.findFirst({
        where: {
            userId,
            paymentIntentId
        }
    })
    if(!paymentIntentIdBelongsToUser) throw new Error('Payment intent does not belong to user')
}





const _registerRequest = async (paymentIntentId: string)=>{

    //% Purchases have an optional refund relationship. We will:
        //% 1- Create the refund
        //% 2- Attach the refund Id to all purchases with the same paymentIntentId
        
    const refund = await prisma.refunds.create({ //* Create the refund
        data: {
            solved: false,
            reason: 'Requested by customeeeeer',
            //! Still not linking to a any purchases
        }
    })

    //* Actually linking purchases to their refunds ✨
    await prisma.purchase.updateMany({
        where: {paymentIntentId: paymentIntentId},
        data: {refundId: refund.id,} //! Still don't mark as "REFUNDED" until the refund is approved.
    })
}





const _sendEmail = async (email: string)=>{
    await sendEmail({
        subject: 'Received a refund',
        content: 'Received refund request from: ' + email,
        receiverEmail: process.env.ADMIN_EMAIL!, //$ (Self)
    })
}

