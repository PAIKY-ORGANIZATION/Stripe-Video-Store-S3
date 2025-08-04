import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { getSessionByPaymentIntentId } from "../get-session-by-payment-intent-id"
import { getRelevantSessionData } from "../get-relevant-session-data"
import { sendEmail } from "@/actions/brevo/send-email"

export const handlePaymentFailureWebhook = async (event: Stripe.PaymentIntentPaymentFailedEvent)=>{


    const {last_payment_error, id, metadata, amount} = event.data.object as Stripe.PaymentIntent
    const {code, message, type} = last_payment_error!

    const checkoutSession = await getSessionByPaymentIntentId(id)

    const relevantSessionData = await getRelevantSessionData(checkoutSession)

    // console.log({id, code, message, relevantSessionData}); //$ Relevant error data

    for (const video of relevantSessionData.videos){
        await prisma.purchase.create({
            data: {
                userId: (metadata as PurchaseMetadata).userId,
                paymentIntentId: id,
                checkoutSessionId: checkoutSession.id,
                status: "FAILURE",
                videoId: video.videoId,
                failureCode: code,
                failureMessage: message
            }
        })
    }

    await sendEmail({
        content: 'We detected a payment failure. \n Payment intent ID: ' + id + '\n Failure code: ' + code + '\n Failure message: ' + message,
        receiverEmail: checkoutSession.customer_details?.email!,
        subject: 'Payment failure detected',
    })

    return new Response('Received', {status: 200})
}
