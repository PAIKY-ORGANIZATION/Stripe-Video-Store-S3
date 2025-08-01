"use server"

import { video } from "@/generated/prisma"
import { getUserBySessionEmail } from "./get-user-by-email"


//! Read the readme.md
export const getUserVideos = async (): Promise<video[]>=>{
    const user = await getUserBySessionEmail()
    return user?.purchases.map((purchase)=> purchase.video) || []
}