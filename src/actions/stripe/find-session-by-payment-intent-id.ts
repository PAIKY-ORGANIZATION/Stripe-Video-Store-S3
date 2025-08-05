//get-session-by-payment-intent-id-ts

import { stripe } from "@/lib/stripe"


export const findSessionByPaymentIntentId = async (paymentIntentId: string)=>{

    const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
        limit: 1 // It avoids retrieving unnecessary data in case multiple sessions SOMEHOW match the same payment_intent.
    })

    const session = sessions.data[0]
    return session
}

