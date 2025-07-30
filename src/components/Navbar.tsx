"use client"
import {useSession} from "next-auth/react"





export default function  Navbar() {

    const session = useSession()

    console.log(session);
    



    return (
        <div className="h-full bg-[#252323] w-full flex ">
        </div>
    )
}