import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
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

            const {id, metadata} = data //* Metadata gets added in the session at "payment_intent_data"

            console.log({metadata});
            


            await prisma.user.update({
                where: {email: metadata?.email},
                data: {
                    videos: {
                        connect: {id: metadata?.videoId!}
                    }
                }
            })


    }

    

    return new Response('Received', {status: 200})

    

}