import { prisma } from "@/lib/prisma"
import Stripe from "stripe"


type AnyDisputeType = 
    Stripe.ChargeDisputeCreatedEvent |
    Stripe.ChargeDisputeClosedEvent |
    Stripe.ChargeDisputeUpdatedEvent |
    Stripe.ChargeDisputeFundsReinstatedEvent |
    Stripe.ChargeDisputeFundsWithdrawnEvent 


export const handleDisputeCreated = async (event: AnyDisputeType)=>{

    const dispute = event.data.object

    const {id, payment_intent} = dispute

    await prisma.purchase.updateMany({
        where: {paymentIntentId: payment_intent as string},
        data: {status: 'DISPUTED'}
    })

}