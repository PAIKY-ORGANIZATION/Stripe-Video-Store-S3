"use client"
import { useSession, signIn } from "next-auth/react"
import ProfilePicture from "./ProfilePicture";
import { signOut } from "next-auth/react"
import Link from "next/link";
export default function Navbar() {
    const { data: session } = useSession();

    return (

        <div className="flex w-full  bg-[#252323] px-10 justify-between">
            <img src={'/minecraft_top_nobg.jpeg'} className="w-[17%] object-contain"></img>
            
            <div className="flex items-center gap-4  justify-around w-[40%] ">
                <Link className="hover:cursor-pointer hover:underline" href={'/'}> Store</Link>
                <Link className="hover:cursor-pointer hover:underline" href={'/library'}> Your library</Link>
                <Link className="hover:cursor-pointer hover:underline" href={'/purchase-history'}> Purchase History</Link>
                <Link className="hover:cursor-pointer hover:underline" href={'/my-cart'}> Your cart</Link>
            </div>

            <div className="flex items-center justify-end h-full gap-4">
                {session?.user ? (
                    <>
                        <ProfilePicture profilePicturePath={session?.user?.image!} />
                        <span className="text-white">{session.user.name}</span>
                        <button onClick={() => signOut()} className="px-2 py-1 text-white bg-red-500 hover:cursor-pointer rounded-xl"> Sign Out</button>
                    </>
                ) : (
                    <button onClick={() => signIn('google', { callbackUrl: '/' })} className="p-1 text-white bg-blue-400 rounded-md hover:cursor-pointer">
                        Sign In
                    </button>
                )}
            </div>

        </div>

    )
}

