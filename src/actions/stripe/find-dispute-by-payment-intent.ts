import { stripe } from "@/lib/stripe"

export const findDisputeByPaymentIntent = async (payment_intent: string)=>{

    const disputes = await stripe.disputes.list({
        payment_intent
    })

    if(disputes.data[0]) return true

    return false
}