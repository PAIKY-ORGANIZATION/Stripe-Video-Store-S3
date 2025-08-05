import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

export const handleChargeRefundedWebhook = async (event: Stripe.ChargeRefundedEvent)=>{


    const charge = event.data.object //%  Technically, a charge can contain many refunds.

    const refundList = await stripe.refunds.list({
        charge: charge.id,
        limit: 1
    })

    const stripeRefund = refundList.data[0]
    const refundMetadata = (stripeRefund.metadata as RefundMetadata)

    //% When we create a refund it still doesn't have a Stripe refund ID, so we need to find it by it's postgres ID, which we added to the metadata when emitting the refund event.
    
    await prisma.refunds.updateManyAndReturn({
        where: {
            id: refundMetadata.postgresRefundId
        },
        data: {
            solved: true, //* Mark the refund as solved so it doesn't appear when managing refunds 
            stripeRefundId: stripeRefund.id //% It is UNTIL THIS POINT that we finally add a refund ID
        }
    })


    //* Invalidate ALL (updateMany) purchases.
    await prisma.purchase.updateMany({
        where: {
            refund: {
                id: refundMetadata.postgresRefundId
            }
        },
        data: {
            status: "REFUNDED"
        }
    })
}