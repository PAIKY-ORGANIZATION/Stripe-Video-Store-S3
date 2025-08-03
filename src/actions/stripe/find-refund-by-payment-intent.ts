import { stripe } from "@/lib/stripe"

export const findRefundBtyPaymentIntent = async (payment_intent: string)=>{

    //% This will give an array of refunds. If the array is greater than 0, we know there was a refund.

    const {data} = await stripe.refunds.list({ payment_intent})


    if(data[0])return true

    return false
    
}