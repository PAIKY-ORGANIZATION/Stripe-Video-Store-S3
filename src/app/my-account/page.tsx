import { getUserBySessionEmail } from "@/actions/users-and-videos/get-user-by-email"
import ShowAccount from "@/components/show-account"
import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"

export default async function MyAccount() {

    const user = await getUserBySessionEmail()

    if(!user) {redirect('/api/auth/signin')}

    const stripeUser = await stripe.customers.retrieve(user.stripeCustomerId!)

    console.log({user, stripeUser});
    
    const {id, object} = stripeUser

    const {} = object
     
    return (
        <div className="flex items-center justify-center w-full h-full text-3xl text-white border">

            <ShowAccount user={user}></ShowAccount>

        </div>
        
    )
}