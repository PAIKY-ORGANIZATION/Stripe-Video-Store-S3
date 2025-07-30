"use client"
import { useSession, signIn } from "next-auth/react"
import ProfilePicture from "./ProfilePicture";
import { signOut } from "next-auth/react"
export default function Navbar() {
    const { data: session } = useSession();

    return (
        <div className="h-full bg-[#252323] w-full flex items-center gap-4 p-2 justify-end px-20">
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
    )
}

