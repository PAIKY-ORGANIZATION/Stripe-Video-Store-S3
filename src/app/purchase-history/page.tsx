import { getUserPurchaseHistory } from "@/actions/get-user-purchase-history"

export default async function PurchaseHistory() {
    
    const purchaseHistory = await getUserPurchaseHistory()

    return (
        <div>PurchaseHistory</div>
    )
}