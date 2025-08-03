import { getRelevantSessionData } from "@/actions/stripe/get-relevant-session-data"
import { getStripeSessionById } from "@/actions/stripe/get-stripe-session-by-id"
import { getUserBySessionEmail } from "@/actions/users-and-videos/get-user-by-email"
import PurchaseHistory from "@/components/PurchaseHistory"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function PurchaseHistoryComponent() {
    
    const user = await getUserBySessionEmail()

    if(!user) {redirect('api/auth/signin')}


    //% The purpose of "groupBy" is to display purchases to customers as they were added to the cart based on sessionId's.
    // % But in the database purchas will be stored product-wise, meaning multiple sold products with the same session ID. 
    const purchases = await prisma.purchase.groupBy({
        by: ["checkoutSessionId"],
        where: {status: "SUCCESS" , userId: user.id}, //$ Using the Enum ✨
        
    })
    //% purchases will look like "[ { checkoutSessionId: '1' }, { checkoutSessionId: '2' } ]"


    const purchaseHistoryArray = await Promise.all(purchases.map( async (purchase)=>{
        const checkoutSession = await getStripeSessionById(purchase.checkoutSessionId) //* First get the session by id
        return getRelevantSessionData(checkoutSession)} //* Then get relevant session data.
    ))

    return (
        <PurchaseHistory relevantSessionDataArray={purchaseHistoryArray} ></PurchaseHistory>
    )
}