import { prisma } from "@/lib/prisma";
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
            const data = event.data.object;
            const metadata = data.metadata as PurchaseMetadata
            const paymentIntentId = data.id

            await prisma.purchase.create({
                data: {
                    paymentIntentId,
                    videoId: (metadata as PurchaseMetadata).videoId,
                    userId: (metadata as PurchaseMetadata).userId
                }
            })


    }

    

    return new Response('Received', {status: 200})

    

}