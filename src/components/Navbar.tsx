"use client"
import { useSession, signIn } from "next-auth/react"
import ProfilePicture from "./ProfilePicture";
import { signOut } from "next-auth/react"
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import { useCartContext } from "./CartContext";
import { FaUserCircle } from "react-icons/fa";



export default function Navbar() {
    const { data: session } = useSession();
    const { cart } = useCartContext(); //* To display the number of items in the cart



    return (

        <div className="flex w-full  bg-[#252323] px-10 justify-between items-center">
            <Link href={'/'} className="w-[17%]">
                <img src={'/v-4-test.png'} className="object-contain"></img>
            </Link>
            
            <div className="flex items-center gap-4  justify-around w-[40%] ">
                <Link className=" underline hover:text-gray-400" href={'/'}> Store</Link>
                <Link className=" underline hover:text-gray-400" href={'/library'}> Your library</Link>
                <Link className=" underline hover:text-gray-400" href={'/purchase-history'}> Orders and refunds</Link>
                <a href="https://miguel-mendez.click" className=" underline hover:text-gray-400"> Contact </a>
            </div>
            
            <Link href={'/my-cart'} className="relative hover:text-gray-400">
                <TiShoppingCart className="text-[30px] hover" />
                {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cart.length}
                    </span>
                )}
            </Link>

            <div className="flex items-center justify-end h-full gap-4 underline ">
                {session?.user ? (
                    <div className="flex items-center gap-4">
                        <ProfilePicture profilePicturePath={session?.user?.image!} />
                        <button onClick={() => signOut()} className=" text-white hover:cursor-pointer hover:text-gray-400 rounded-xl"> Log  Out</button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <FaUserCircle className="text-[30px]"></FaUserCircle>
                        <button onClick={() => signIn('google', { callbackUrl: '/' })} className="p-1 text-white  rounded-md hover:cursor-pointer hover:text-gray-400">
                            Sign In
                        </button>
                    
                    </div>
                )}
            </div>

        </div>

    )
}

