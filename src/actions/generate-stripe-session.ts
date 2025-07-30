"use server"

import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import {getServerSession} from 'next-auth'


export const generateStripeSession = async (videoId: string): Promise<ActionResponse> => {

    const userSession = await getServerSession() //* Getting the user session with nextauth.

    if(!userSession){ //$ As far as I understand we can trust that if there is a session is because they owe auth and JWT verification was successful
        return {message: 'You are not logged in', success: false}
    }

    try{
            //* Getting video info from Prisma
            const video = await prisma.video.findFirstOrThrow({
                where: { id: videoId },
            });
        
            //* Creating Stripe session
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            product_data: {
                                name: video.title,
                                description: video.description,
                            },
                            currency: video?.currency,
                            unit_amount: video.price * 100,
                        },
                        quantity: 1,
                    },
                ],
                success_url: 'http://localhost:3000/success/' + videoId,
                cancel_url: 'http://localhost:3000',
                mode: 'payment',
                billing_address_collection: 'required',
                payment_intent_data: {
                    metadata: { //* Code this is so that I cannot the relationship of the user with the product after success purchase webhook.
                        videoId,
                        userId: userSession.user?.email! //¡ Change to userId
                    }
                }
            });
        
        
            return  {message: 'Session created successfully', success: true, data: {sessionUrl: session.url}}
        
    }catch(e){

        console.log(e);
        

        return {message: 'Error creating session', success: false, data: {error: e}} 	
    }

};
