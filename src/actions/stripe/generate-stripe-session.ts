"use server"

import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { user, video } from '@/generated/prisma';
import { getUserBySessionEmail } from '../users-and-videos/get-user-by-email';


//% This function will:
    //% 1. Support passing an array of video ID's (string[]). 
    //% 2. Query Prisma for an array of videos (prisma.video[]).
    //% 3. The loop through the videos to add them to the line_items property of the Stripe session.

export const generateStripeSession = async (videoIdArray: string[]): Promise<ActionResponse> => {

    const user = await getUserBySessionEmail() //* Getting the user session with next-auth.
    if(!user)   redirect('/api/auth/signin')

    const existingPurchase =  await prisma.purchase.findFirst({where:{ //* Preventing duplicate purchase
        userId: user.id,
        videoId: {in: videoIdArray},
        status: 'SUCCESS' //* ONLY SUCCESSFUL PURCHASES 
    }})

    if(existingPurchase) return {message: 'You already own one or more of these videos', success: false}

    //* Getting video info from Prisma
    const videos = await prisma.video.findMany({ where: {id: {in: videoIdArray }},});
    
    if(videos.length !== videoIdArray.length) return {message: 'One or more videos were not found', success: false}
    
    try{
        //* Creating Stripe session object
        const session = await _createStripeSessionObject(videos, user)
        return {message: 'Session created successfully', success: true, data: {sessionUrl: session.url}}
        
    }catch(e){
        console.log(e);	
        return {message: 'Error creating session', success: false, data: {error: e}} 	
    }
};



export const _createStripeSessionObject = async (videos: video[], user: user)=>{
    
    //* Setting line items
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = videos.map((video)=>{return {
        price_data: {
            
            product_data: {
                name: video.title,
                description: video.description,
                images:[ process.env.APP_HOST + video.thumbnailLocalPath], //? Try to display these in success page
                metadata: {
                    videoId: video.id
                } as VideoMetadata
            },
            unit_amount: video.price * 100,
            currency: 'usd',
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
            //! I will be adding the metadata to the product data of each item.
            userId: user.id
        } as PurchaseMetadata,
        payment_intent_data: { //- We need the speakers in case of failures we only have access to the payment intent, not the session.
            metadata: {
                userId: user.id
            } as PurchaseMetadata
        },
        // customer_creation: 'always',
        customer: user.stripeCustomerId!  //% Assuming this ID is present because all users get a Stripe Account created when singing up. This will link users with their email during session and will link their purchases with their unique stripe customer.
    });

    return  session
}