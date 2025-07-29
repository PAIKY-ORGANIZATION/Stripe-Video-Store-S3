import { prisma } from "@/lib/prisma"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"


const CLIENT_ID_GOOGLE = process.env.CLIENT_ID_GOOGLE
const CLIENT_SECRET_GOOGLE = process.env.CLIENT_SECRET_GOOGLE



const authOption: NextAuthOptions = {
    session: {
        strategy:  'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        GoogleProvider({
            clientId: CLIENT_ID_GOOGLE!,
            clientSecret: CLIENT_SECRET_GOOGLE!,

        })
    ],
    callbacks: {
        async signIn({account, profile}){ //$ This function is called once the user signs in
            //*  Contents of the "account" object:
            // account?.access_token //$ This exists
            // account?.provider //$ This exists
            // account?.userId //$ This exists

            if(!profile?.email){
                throw new Error('Email is required')
            }
            await prisma.user.upsert({
                where: {email: profile.email},
                create: {
                    email: profile.email,
                    username: profile.name || 'Unknown',
                    
                },
                update: {}
            })

            return true
        },

        async jwt ({token, account}) { //- This is saved in the user's browser.
            //$ This function is called:
                //$  1- Once including the "account" object (when signing in)
                //$  2- Any subsequent requests ("getSession()", "useSession()") with "account" being undefined

            //* What JWT will look like this by default:
            // {
            //     name: "Jane Doe",
            //     email: "jane@example.com",
            //     picture: "https://...",
            //     iat: ...,
            //     exp: ...
            // }

            if(account){
                token.accessToken = account.access_token //$ you can access this token later if you want to call the Google API.
            }


            return token
        },

        async session({session, token}){ //$ The returned "Session" will always be passed to "useSession()" and "getSession()"

            //* Session looks like this by default:
            // {
            //     user: {
            //         name: "Jane Doe",
            //         email: "jane@example.com",
            //         image: "https://...",
            //     },
            //     expires: string
            // }

            token.email
            session.user?.email
        }
    }
}


const handler = NextAuth(authOption)
export {handler as GET, handler as POST}