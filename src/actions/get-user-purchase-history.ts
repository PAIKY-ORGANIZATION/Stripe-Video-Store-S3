import { stripe } from "@/lib/stripe"
import { getUserBySessionEmail } from "./get-user-by-email"

export const getUserPurchaseHistory = async ()=>{

    const user = await getUserBySessionEmail()

    if(!user?.purchases) return []


    for(const purchase of user.purchases){

        console.log(purchase.paymentIntentId);
        

        const sessions = await stripe.checkout.sessions.list({
            payment_intent: purchase.paymentIntentId,
            limit: 1 // It avoids retrieving unnecessary data in case multiple sessions SOMEHOW match the same payment_intent.
        })

        const sessionData = sessions.data[0]

        console.log({sessionData});
        

    }

    return user?.purchases.map((purchase)=>{

        return {
            videoTitle: purchase.video.id,

        }

    })

}