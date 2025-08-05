import { sendEmail } from "@/actions/brevo/send-email";
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"


type AnyDisputeType = 
    Stripe.ChargeDisputeCreatedEvent |
    Stripe.ChargeDisputeClosedEvent |
    Stripe.ChargeDisputeUpdatedEvent |
    Stripe.ChargeDisputeFundsReinstatedEvent |
    Stripe.ChargeDisputeFundsWithdrawnEvent 


export const handleDisputeCreated = async (event: AnyDisputeType)=>{

    await new Promise((r) => setTimeout(r, 2000)); //! When in Stripe-test-mode, the dispute arrives sooner then the successful session. We force wait 2 secs to allow the successful session to arrive first and register the purchase.


    const StripeDispute = event.data.object

    const {id, payment_intent, reason, status} = StripeDispute

    //* Register the dispute in Postgres
    const prismaDispute = await prisma.disputes.create({
        data: {
            stripeDisputeId: id, //$ du_
            reason,
            status,
        }
    })
    

    //* Immediately invalidating
    await prisma.purchase.updateMany({
        where: {paymentIntentId: payment_intent as string},
        data: {
            status: 'DISPUTED',
            disputeId: prismaDispute.id
        }
    })

    await sendEmail({
        content: 'We detected a dispute. \n Dispute ID: ' + id + '\n Payment intent ID: ' + payment_intent + '\n Reason: ' + reason + '\n Status: ' + status,
        receiverEmail: process.env.ADMIN_EMAIL!,
        subject: 'Dispute detected',
    })
}