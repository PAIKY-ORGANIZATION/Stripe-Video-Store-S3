"use server"


import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"



//$ The reason to do this is because next-auth will give us a session that only contains "name, email, image"
//$ This is just a little helper function to get the complete user from it's email.
export const getUserBySessionEmail = async ()=>{

    const session = await getServerSession() //$ As far as I understand we can TRUST that if there is a session is because they owe auth and JWT verification was successful. If you were to modify the JWT cookie on your browser, this WILL FAIL. It works.

    const email = session?.user?.email

    if (!email) return null


    const user = await prisma.user.findUnique({
        where: {email},  
        include: {
            purchases: {
                include: {
                    video: true
                }
            }
        }
    })
    
    return user

}