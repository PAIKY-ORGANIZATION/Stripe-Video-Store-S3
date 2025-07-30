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
            
            <div className="text-xl flex items-center gap-4  justify-around w-[40%] ">
                <Link className="hover:cursor-pointer hover:underline" href={'/'}> Store</Link>
                <Link className="hover:cursor-pointer hover:underline" href={'/library'}> Your library</Link>
                <Link className="hover:cursor-pointer hover:underline" href={'/purchase-history'}> Purchase History</Link>
            </div>

            <div className="h-full flex items-center gap-4  justify-end">
                {session?.user ? (
                    <>
                        <ProfilePicture profilePicturePath={session?.user?.image!} />
                        <span className="text-white">{session.user.name}</span>
                        <button onClick={() => signOut()} className="text-white hover:cursor-pointer bg-red-500 px-2 py-1 rounded-xl"> Sign Out</button>
                    </>
                ) : (
                    <button onClick={() => signIn('google', { callbackUrl: '/' })} className="text-white hover:cursor-pointer p-1 rounded-md bg-blue-400">
                        Sign In
                    </button>
                )}
            </div>

        </div>

    )
}

