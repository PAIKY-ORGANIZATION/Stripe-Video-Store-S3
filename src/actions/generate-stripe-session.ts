"use server"

import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export const generateStripeSession = async (videoId: string): Promise<ActionResponse> => {

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
                success_url: 'http://localhost:3000',
                cancel_url: 'http://localhost:3000',
                mode: 'payment',
                billing_address_collection: 'required'
            });
        
        
            return  {message: 'Session created successfully', success: true, data: {sessionUrl: session.url}}
        
    }catch(e){

        console.log(e);
        

        return {message: 'Error creating session', success: false, data: {error: e}} 	
    }

};
