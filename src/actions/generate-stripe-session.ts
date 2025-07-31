"use server"

import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { getUserBySessionEmail } from './get-user-by-email';

export const generateStripeSession = async (videoIdArray: string[]): Promise<ActionResponse> => {

    const user = await getUserBySessionEmail() //* Getting the user session with nextauth.
    if(!user)   redirect('/api/auth/signin')
    

    //* Getting video info from Prisma
    const videos = await prisma.video.findMany({ where: {id: {in: videoIdArray }},});
    
    if(videos.length !== videoIdArray.length) return {message: 'One or more videos were not found', success: false}

    try{
        //* Creating Stripe session
        const session = await stripe.checkout.sessions.create({

            line_items: videos.map((video)=>{return {
                price_data: {
                    product_data: {
                        name: video.title,
                        description: video.description,
                        images:[ video.thumbnailLocalPath] //? Try to display these in success page
                    },
                    unit_amount: video.price * 100,
                    currency: 'usd'
                },
                quantity: 1
            }}),
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000',
            mode: 'payment',
            billing_address_collection: 'required',
            metadata: {
                videoIds: videoIdArray.join(','), //*  This is so I can set the relationshipS of the user with the productS after success purchase webhook.
                userId: user?.id! 
            } as PurchaseMetadata
        });
    
        return  {message: 'Session created successfully', success: true, data: {sessionUrl: session.url}}
    }catch(e){
        console.log(e);
        return {message: 'Error creating session', success: false, data: {error: e}} 	
    }

};
