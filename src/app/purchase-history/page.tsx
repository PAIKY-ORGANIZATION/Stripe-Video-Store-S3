import { getUserBySessionEmail } from "@/actions/get-user-by-email"
import { getRelevantSessionData } from "@/actions/get-user-purchase-history"
import { prisma } from "@/lib/prisma"

export default async function PurchaseHistory() {
    
    const user = await getUserBySessionEmail()

    if(!user?.purchases) return []
    
    //% The purpose of "groupBy" is to display purchases to customers as they were added to the cart based on sessionId's.
    // % But in the database purchases will be stored product-wise, meaning multiple sold products with the same session ID. 
    const purchases = await prisma.purchase.groupBy({
        by: ["checkoutSessionId"]
    })
    //% purchases will look like "[ { checkoutSessionId: '1' }, { checkoutSessionId: '2' }, { checkoutSessionId: '3' } ]"


    const purchaseHistoryArray = await Promise.all(purchases.map((purchase)=>getRelevantSessionData(purchase.checkoutSessionId)))

    return (
        <div>PurchaseHistory</div>
    )
}