
import { getUserBySessionEmail } from '@/actions/users-and-videos/get-user-by-email'
import Library from '@/components/Library'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'


//prettier-ignore
export default async function library() {

    const user = await getUserBySessionEmail()

    if(!user) { redirect('/api/auth/signin')}

    const purchases = await prisma.purchase.findMany({
        where: { userId: user.id, status: "SUCCESS" },
        include: { video: true}
    })

    const userVideos =  purchases.map((purchase)=> purchase.video) || [] //$ This it's self takes care of auth.

    if(userVideos.length === 0){ return <p className="flex items-center justify-center w-full h-full text-3xl text-white">No videos found 😔</p>}

    return (
        <Library userVideos={userVideos} />
    )
}