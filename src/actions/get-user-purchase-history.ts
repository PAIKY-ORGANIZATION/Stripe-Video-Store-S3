import { stripe } from "@/lib/stripe"

export const getRelevantSessionData = async (checkoutSessionId: string)=>{

    




    const session = await stripe.checkout.sessions.retrieve(checkoutSessionId)
    const items = await stripe.checkout.sessions.listLineItems(checkoutSessionId) //% Another way might be to get the video purchased from db. 

    //?  Return that session and items. show a list of all purchases and include a button to see details
    const relevantSessionData = {
        sessionId: session.id,
        date: new Date(session.created).toISOString(),
        price: session.amount_total,
        // videoId: (session.metadata as PurchaseMetadata)
    }


    return user?.purchases.map((purchase)=>{

        return {
            videoTitle: purchase.video.id,

        }

    })

}