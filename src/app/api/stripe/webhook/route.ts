import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest } from "next/server";


const signingSecret = process.env.STRIPE_SIGNING_SECRET!

export const POST = async (req: NextRequest) => {
    const bodyBinary = await req.text() //? Might need extra configuration to receive in binary form

    const headerStore = await headers()

    const binaryHeader = headers().get('stripe-signature')


    let event

    try{
        event = stripe.webhooks.constructEvent(bodyBinary, signingSecret, binaryHeader)
    }catch(e){
        console.log(e);	
    }

    console.log({bodyBinary});
    

}