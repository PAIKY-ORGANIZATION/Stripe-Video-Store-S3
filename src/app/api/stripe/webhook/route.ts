import { handleChargeRefundedWebhook } from "@/actions/stripe/webhook-handlers/handle-charge-refunded-webhook";
import { handleDisputeCreated } from "@/actions/stripe/webhook-handlers/handle-dispute-created";
import { handleEventIdempotency } from "@/actions/stripe/webhook-handlers/handle-event-idempotency";
import { handlePaymentFailureWebhook } from "@/actions/stripe/webhook-handlers/handle-payment-failure-webhook";
import { handleSuccessSessionWebhook } from "@/actions/stripe/webhook-handlers/handle-success-session-webhook";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";


const signingSecret = process.env.STRIPE_SIGNING_SECRET!

export const POST = async (req: NextRequest) => {

    const bodyBinary = await req.text() //? Might need extra configuration to receive in binary form


    console.log({bodyBinary,});
    

    const binaryHeader = req.headers.get('stripe-signature')!

    console.log({binaryHeader});
    


    let event

    try{
        event = stripe.webhooks.constructEvent(bodyBinary, binaryHeader, signingSecret)
    }catch(e){
        console.log(e);	
        return NextResponse.json({ error: e }, { status: 400 });
    }


    //* Prevent idempotency by preventing a duplicated Event ID.
    const isDuplicated = await handleEventIdempotency(event.id, event.type)
    if(isDuplicated) return new Response('Received', { status: 200 });

    switch(event.type){
        //* Successful session
        case "checkout.session.completed":
            await handleSuccessSessionWebhook(event)
            break
        
        //* Failure (example: invalid CV, insufficient funds)
        case  "payment_intent.payment_failed":
            await handlePaymentFailureWebhook(event)
            break
        
        //* Refunds
        case "charge.refunded": //% Technically, a charge can contain many refunds.
            await handleChargeRefundedWebhook(event)
            break
        //* Disputes ---------------------------------------------------------------
        case "charge.dispute.created":
            //* Suspending services and  register dispute
            await handleDisputeCreated(event)
            break            

        case "charge.dispute.updated":
            //? Notify myself.
            break

        case "charge.dispute.closed":
            //? Notify of outcome
            break

        case "charge.dispute.funds_reinstated":
            //? Reactivate services
        
        case "charge.dispute.funds_withdrawn":
            //? Notify of outcome
        //*  ---------------------------------------------------------------------

        default: 
            return new Response('Received unknown event', {status: 200}) 
    }
	return new Response('Received', { status: 200 }); //% Only after known cases this will be reached
}