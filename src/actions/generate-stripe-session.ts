"use server"

import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { getUserBySessionEmail } from './get-user-by-email';

export const generateStripeSession = async (videoId: string): Promise<ActionResponse> => {

    const user = await getUserBySessionEmail() //* Getting the user session with nextauth.
    if(!user)   redirect('/api/auth/signin')
    

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
                        currency: 'usd',
                        unit_amount: video.price * 100,
                    },
                    quantity: 1,
                },
            ],
            success_url: 'http://localhost:3000/success/' + videoId,
            cancel_url: 'http://localhost:3000',
            mode: 'payment',
            billing_address_collection: 'required',
            metadata: {
                videoId, //*  This is so I can set the relationship of the user with the product after success purchase webhook.
                userId: user?.id! 
            } as PurchaseMetadata
        });
    
        return  {message: 'Session created successfully', success: true, data: {sessionUrl: session.url}}
    }catch(e){
        console.log(e);
        return {message: 'Error creating session', success: false, data: {error: e}} 	
    }

};
