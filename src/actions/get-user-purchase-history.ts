import { stripe } from "@/lib/stripe"
import { getUserBySessionEmail } from "./get-user-by-email"

export const getUserPurchaseHistory = async ()=>{

    const user = await getUserBySessionEmail()

    if(!user?.purchases) return []

    const purchaseHistoryArray = []

    for(const purchase of user.purchases){


        const session = await stripe.checkout.sessions.retrieve(purchase.checkoutSessionId)
        const items = await stripe.checkout.sessions.listLineItems(purchase.checkoutSessionId) //% Another way might be to get the video purchased from db. 

        //?  Return that session and items. show a list of all purchases and include a button to see details
        purchaseHistoryArray.push({
            sessionId: session.id,
            date: new Date(session.created).toISOString(),
            price: session.amount_total,
            videoId: (session.metadata as PurchaseMetadata)
        })

    }

    return user?.purchases.map((purchase)=>{

        return {
            videoTitle: purchase.video.id,

        }

    })

}