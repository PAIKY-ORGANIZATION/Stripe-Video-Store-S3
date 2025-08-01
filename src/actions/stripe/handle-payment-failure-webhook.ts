import Stripe from "stripe"
import { getSessionByPaymentIntentId } from "./get-session-by-payment-intent-id"
import { getRelevantSessionData } from "./get-relevant-session-data"
import { prisma } from "@/lib/prisma"
import { handleEventIdempotency } from "./handle-event-idempotency"

export const handlePaymentFailureWebhook = async (event: Stripe.PaymentIntentPaymentFailedEvent)=>{

    await handleEventIdempotency(event.id, event.type)

    const {last_payment_error, id, metadata} = event.data.object as Stripe.PaymentIntent
    const {code, message, type} = last_payment_error!

    const session = await getSessionByPaymentIntentId(id)

    const relevantSessionData = await getRelevantSessionData(session.id)

    console.log({id, code, message, relevantSessionData});

    for (const video of relevantSessionData.videos){
        await prisma.purchase.create({
            data: {
                userId: (metadata as PurchaseMetadata).userId,
                paymentIntentId: id,
                checkoutSessionId: session.id,
                success: false,
                videoId: video.videoId,
                failureCode: code,
                failureMessage: message
            }
        })
    }

    return new Response('Received', {status: 200})
}