import Stripe from "stripe"

export const handlePaymentFailureWebhook = async (event: Stripe.PaymentIntentPaymentFailedEvent)=>{

    

    return new Response('Received', {status: 200})
}