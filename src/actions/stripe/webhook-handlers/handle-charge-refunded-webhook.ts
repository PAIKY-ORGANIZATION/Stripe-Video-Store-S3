import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

export const handleChargeRefundedWebhook = async (event: Stripe.ChargeRefundedEvent)=>{
    //
    const charge = event.data.object //%  Technically, a charge can contain many refunds.

    const refundList = await stripe.refunds.list({
        charge: charge.id,
        limit: 1
    })

    const refund = refundList.data[0]


    //* Invalidate ALL (updateMany) purchases.
    await prisma.purchase.updateMany({
        where: {
            refund: {
                id: refund.id
            }
        },
        data: {
            status: "REFUNDED"
        }
    })

    //* Mark the refund as solved so it doesn't appear when managing refunds 
    await prisma.refunds.update({
        where: {
            stripeRefundId: refund.id
        },
        data: {
            solved: true
        }
    })

}