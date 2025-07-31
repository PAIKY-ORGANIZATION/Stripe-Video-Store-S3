import { getUserBySessionEmail } from "@/actions/get-user-by-email"
import { getRelevantSessionData } from "@/actions/get-user-purchase-history"

export default async function PurchaseHistory() {
    
    const user = await getUserBySessionEmail()

    if(!user?.purchases) return []

    const purchaseHistory = await getRelevantSessionData()

    return (
        <div>PurchaseHistory</div>
    )
}