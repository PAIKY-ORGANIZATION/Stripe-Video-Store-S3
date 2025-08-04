
import { getUserBySessionEmail } from '@/actions/users-and-videos/get-user-by-email'
import Library from '@/components/Library'
import { video } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'


//prettier-ignore
export default async function library() {

    //* Check for session
    const user = await getUserBySessionEmail()
    if(!user) { redirect('/api/auth/signin')}
    
    //* Get purchased videos
    const purchases = await prisma.purchase.findMany({
        where: { userId: user.id, status: "SUCCESS" },
        include: { video: true}
    })

    const userVideos: video[] =  purchases.map((purchase)=> purchase.video) || []

    if(userVideos.length === 0){ return <p className="flex items-center justify-center w-full h-full text-3xl text-white">No videos found 😔</p>}

    return (
        <Library userVideos={userVideos} />
    )
}