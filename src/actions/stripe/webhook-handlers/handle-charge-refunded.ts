import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

export const handleChargeRefundedWebhook = async (event: Stripe.ChargeRefundedEvent)=>{
    //
    const {payment_intent} = event.data.object

    //* Invalidate ALL (updateMany) purchases with paymentIntent from refunded charge
    await prisma.purchase.updateMany({
        where: {
            paymentIntentId: payment_intent as string
        },
        data: {
            status: "REFUNDED"
        }
    })
}