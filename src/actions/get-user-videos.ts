"use server"

import { getUserBySessionEmail } from "./get-user-by-email"


//! Read the readme.md
export const getUserVideos = async ()=>{
    const user = await getUserBySessionEmail()
    return user?.purchases.map((purchase)=> purchase.video) || []
}