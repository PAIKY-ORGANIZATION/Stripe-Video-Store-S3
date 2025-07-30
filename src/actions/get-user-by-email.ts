"use server"


import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"



//$ The reason to do this it's because next-auth will give us a session that only contains "name, email, image"
//$ This is just a little helper function.
export const getUserBySessionEmail = async ()=>{

    const session = await getServerSession()

    

    const email = session?.user?.email

    if (!email) return null


    const user = await prisma.user.findUnique({
        where: {email},  
        include: {
            videos: true
        }
    })

    return user

}