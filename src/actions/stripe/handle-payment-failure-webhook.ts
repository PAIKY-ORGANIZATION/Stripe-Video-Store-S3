import Stripe from "stripe"

export const handlePaymentFailureWebhook = async (event: Stripe.PaymentIntentPaymentFailedEvent)=>{

    const {last_payment_error, id} = event.data.object as Stripe.PaymentIntent
    const {code, message, type} = last_payment_error!


    console.log({id, code, message, type});
    

    return new Response('Received', {status: 200})
}