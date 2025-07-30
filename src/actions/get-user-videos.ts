"use server"

import { getUserBySessionEmail } from "./get-user-by-email"

export const getUserVideos = async ()=>{
    const user = await getUserBySessionEmail()
    return user?.videos || []
}