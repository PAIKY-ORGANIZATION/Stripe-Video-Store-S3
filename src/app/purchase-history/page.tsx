import { getRelevantSessionData } from "@/actions/stripe/get-relevant-session-data"
import { getStripeSessionById } from "@/actions/stripe/get-stripe-session-by-id"
import { getUserBySessionEmail } from "@/actions/users-and-videos/get-user-by-email"
import PurchaseHistory from "@/components/PurchaseHistory"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function PurchaseHistoryComponent() {
    
    const user = await getUserBySessionEmail()

    if(!user) {redirect('api/auth/signin')}


    //% The purpose of "groupBy" is to display purchases to customers as they were added to the cart based on sessionId's.
    // % But in the database purchase will be stored product-wise, meaning multiple sold products with the same session ID. 
    const purchases = await prisma.purchase.groupBy({
        by: ["checkoutSessionId"],
        where: { userId: user.id} //$ Even solved refunds are included.
        
    })
    //% purchases will look like "[ { checkoutSessionId: '1' }, { checkoutSessionId: '2' } ]"


    const purchaseHistoryArray = await Promise.all(purchases.map( async (purchase)=>{
        const checkoutSession = await getStripeSessionById(purchase.checkoutSessionId) //* First get the session by id
        return getRelevantSessionData(checkoutSession)} //* Then get relevant session data.
    ))

    if(purchaseHistoryArray.length === 0){ return(
        <>
            <p className="flex flex-col items-center justify-center w-full h-full text-xl text-white">
                You still don't have any orders
                <Link href={'/'} className="p-2 mt-4 text-white bg-blue-500 rounded hover:underline"> Visit the store </Link>
            </p>
        </>
    )}

    return (
        <PurchaseHistory relevantSessionDataArray={purchaseHistoryArray} ></PurchaseHistory>
    )
}