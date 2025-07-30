"use client"
import { SessionProvider } from "next-auth/react"
import React from "react"


//$ The only reason as of creating a wrapper of the wrapper is to use "use client" here to avoid server component errors
export default function  SessionProviderUseClient({children}: {children: React.ReactNode}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}