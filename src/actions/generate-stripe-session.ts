"use server"

import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { getUserBySessionEmail } from './get-user-by-email';
import Stripe from 'stripe';
import { video } from '@/generated/prisma';


//% This function will:
    //% 1. Support passing an array of video ID's (string[]). 
    //% 2. Query Prisma for an array of videos (prisma.video[]).
    //% 3. The loop through the videos to add them to the line_items property of the Stripe session.

export const generateStripeSession = async (videoIdArray: string[]): Promise<ActionResponse> => {

    const user = await getUserBySessionEmail() //* Getting the user session with nextauth.
    if(!user)   redirect('/api/auth/signin')

    //* Getting video info from Prisma
    const videos = await prisma.video.findMany({ where: {id: {in: videoIdArray }},});
    
    if(videos.length !== videoIdArray.length) return {message: 'One or more videos were not found', success: false}
    
    try{
        //* Creating Stripe session object
        const session = await _createStripeSessionObject(videos, user.id)
        return {message: 'Session created successfully', success: true, data: {sessionUrl: session.url}}
        
    }catch(e){
        console.log(e);	
        return {message: 'Error creating session', success: false, data: {error: e}} 	
    }
};



export const _createStripeSessionObject = async (videos: video[], userId: string)=>{
    
    //* Setting line items
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = videos.map((video)=>{return {
        price_data: {
            
            product_data: {
                name: video.title,
                description: video.description,
                images:[ process.env.APP_HOST + video.thumbnailLocalPath], //? Try to display these in success page
                metadata: {
                    videoId: video.id
                }
            },
            unit_amount: video.price * 100,
            currency: 'usd'
        },
        quantity: 1
    }})

    const session = await stripe.checkout.sessions.create({

        line_items: line_items,
        success_url: process.env.APP_HOST+ '/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: process.env.APP_HOST,
        mode: 'payment',
        billing_address_collection: 'required',
        metadata: {
            // videoIds: videoIdArray.join(','), //*  This is so I can set the relationshipS of the user with the productS after success purchase webhook.
            //! I will be adding the metadata to the product data of each item.
            userId
        } as PurchaseMetadata
    });

    return  session


}