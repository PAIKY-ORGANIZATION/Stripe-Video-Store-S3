import { getUserBySessionEmail } from "@/actions/users-and-videos/get-user-by-email";
import Cart from "@/components/Cart";
import { logAction } from "@/utils/action-log";
import { redirect } from "next/navigation";

export default async function MyCart() {

    //* Only for logging the request to Postgres
    await logAction({
        action: 'Visited "cart" page',
        filePath: 'all-requests-GIT-IGNORE.txt',
    })





    const session = await getUserBySessionEmail()
    if(!session) redirect('/api/auth/signin')


    return (
        <Cart></Cart>
    )
}