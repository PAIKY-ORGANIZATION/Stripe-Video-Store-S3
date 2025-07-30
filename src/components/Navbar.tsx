"use client"
import { useSession, signIn } from "next-auth/react"
import ProfilePicture from "./ProfilePicture";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <div className="h-full bg-[#252323] w-full flex items-center gap-4 p-2 justify-end px-20">
            {session?.user ? (
                <>
                    <ProfilePicture profilePicturePath={session?.user?.image!} />
                    <span className="text-white">{session.user.name}</span>
                </>
            ) : (
                <button onClick={() => signIn('google', { callbackUrl: '/authOnly' })} className="text-white  p-1 rounded-md bg-blue-400">
                    Sign In
                </button>
            )}
        </div>
    )
}
