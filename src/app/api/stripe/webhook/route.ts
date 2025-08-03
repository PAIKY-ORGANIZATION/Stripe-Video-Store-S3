import { handleChargeRefundedWebhook } from "@/actions/stripe/webhook-handlers/handle-charge-refunded";
import { handlePaymentFailureWebhook } from "@/actions/stripe/webhook-handlers/handle-payment-failure-webhook";
import { handleSuccessSessionWebhook } from "@/actions/stripe/webhook-handlers/handle-success-session-webhook";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";


const signingSecret = process.env.STRIPE_SIGNING_SECRET!

export const POST = async (req: NextRequest) => {

    const bodyBinary = await req.text() //? Might need extra configuration to receive in binary form

    const binaryHeader = req.headers.get('stripe-signature')!
    let event

    try{
        event = stripe.webhooks.constructEvent(bodyBinary, binaryHeader, signingSecret)
    }catch(e){
        console.log(e);	
        return NextResponse.json({ error: e }, { status: 400 });
    }
    

    switch(event.type){
        case "checkout.session.completed":
            return await handleSuccessSessionWebhook(event)
        
            
        case  "payment_intent.payment_failed":
            return await handlePaymentFailureWebhook(event)

        case "charge.refunded": //% Technically, a charge can contain many refunds.
            return await handleChargeRefundedWebhook(event)


        default: 
            return new Response('Received', {status: 200})

    }


    

}