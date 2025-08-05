import { getUserBySessionEmail } from "@/actions/users-and-videos/get-user-by-email";
import Cart from "@/components/Cart";
import { redirect } from "next/navigation";

export default async function MyCart() {

    const session = await getUserBySessionEmail()
    if(!session) redirect('/api/auth/signin')


    return (
        <Cart></Cart>
    )
}