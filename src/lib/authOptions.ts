import { prisma } from "@/lib/prisma"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { stripe } from "./stripe"


const CLIENT_ID_GOOGLE = process.env.CLIENT_ID_GOOGLE!
const CLIENT_SECRET_GOOGLE = process.env.CLIENT_SECRET_GOOGLE



export const authOptions: NextAuthOptions = {
    session: {
        strategy:  'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    //¡ If you're wondering, the redirect uri will be hardcoded from next JS and it has to be:
    // http://localhost:3000/api/auth/callback/google
    // !When you set it up in the Google app.
    //! The redirect uri is where all the callbacks will run after successful authentication.
    providers: [
        GoogleProvider({
            // id: 'google', //$ This is set by def. Will help when calling "signIn()" client-side
            clientId: CLIENT_ID_GOOGLE!,
            clientSecret: CLIENT_SECRET_GOOGLE!,

        })
    ],
    callbacks: {
        async signIn({profile, account, user, credentials}){ //$ This function is called once the user signs in
            //*  Contents of the "account" object:
            // account?.access_token //$ This exists
            // account?.provider //$ This exists
            // account?.userId //$ This exists

            if(!profile?.email){ throw new Error('Email is required')}
            
            
            const appUser = await prisma.user.upsert({
                where: {email: profile.email},
                create: {
                    email: profile.email,
                    username: profile.name || 'Unknown',
                    
                },
                update: {}
            })
            
            //* Creating Stripe customer only for new users.
            if(!appUser.stripeCustomerId){
                const stripeUser = await stripe.customers.create({
                    email:  profile.email,
                    metadata: {
                        appUserId: appUser.id
                    }
                })
            
                await prisma.user.update({
                    where: {
                        id: appUser.id
                    },
                    data: {
                        stripeCustomerId: stripeUser.id  
                    }
                })
            }

            return true
        },


        //$ Here we can manipulate the JWT. 
        //$ This is like our Express authentication middleware that will run on every request passing the user ID to the following request handlers
        async jwt ({token, account, user, session, profile,  }) { //- This is saved in the user's browser.
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

            if(account && user.email){
                token.id = user?.id!                
            }


            return token
        },

        //! We could just not include this callback.
        // async session({session, token}){ //$ The returned "Session" will always be passed to "useSession()" and "getSession()"

        //     //* Session looks like this by default:
        //     // {
        //     //     user: {
        //     //         name: "Jane Doe",
        //     //         email: "jane@example.com",
        //     //         image: "https://...",
        //     //     },
        //     //     expires: string
        //     // }
        //     return session
        // }
    }
}