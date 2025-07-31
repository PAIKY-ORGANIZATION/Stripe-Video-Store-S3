import { stripe } from "@/lib/stripe"

export const getRelevantSessionData = async (checkoutSessionId: string)=>{

    




    const session = await stripe.checkout.sessions.retrieve(checkoutSessionId)
    const items = await stripe.checkout.sessions.listLineItems(checkoutSessionId) //% Another way might be to get the video purchased from db. 


    console.dir({items},  {depth: null});
    

    //?  Return that session and items. show a list of all purchases and include a button to see details
    const relevantSessionData = {
        date: new Date(session.created).toISOString(),
        total: session.amount_total,

    }

}