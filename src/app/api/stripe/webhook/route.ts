import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const bodyBinary = await req.text() //? Might need extra configuration to receive in binary form

    const headerStore = await headers()

    const binaryHeader = headers().get('stripe-signature')


    let event

    try{
        event = stripe.webhooks.constructEvent(bodyBinary, )
    }catch(e){
        console.log(e);	
    }

    console.log({bodyBinary});
    

}