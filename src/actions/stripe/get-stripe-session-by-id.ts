import { stripe } from "@/lib/stripe"
import Stripe from "stripe"


//% I know this is a wrapper of the same function. I just use it a lot, wanted to make it "known"
export const getStripeSessionById = async (SessionId: string): Promise<Stripe.Checkout.Session>=> {
    return stripe.checkout.sessions.retrieve(SessionId)
}