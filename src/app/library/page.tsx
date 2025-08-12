
import { getUserBySessionEmail } from '@/actions/users-and-videos/get-user-by-email'
import Library from '@/components/Library'
import { video } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'
import { logAction } from '@/utils/action-log'
import Link from 'next/link'
import { redirect } from 'next/navigation'


//prettier-ignore
export default async function library() {

    await logAction({
        action: 'Visited "cart" page',
        filePath: 'all-requests-GIT-IGNORE.txt',
    })




    //* Check for session
    const user = await getUserBySessionEmail()
    if(!user) { redirect('/api/auth/signin')}
    
    //* Get purchased videos
    const purchases = await prisma.purchase.findMany({
        where: { userId: user.id, status: "SUCCESS" },
        include: { video: true}
    })

    const userVideos: video[] =  purchases.map((purchase)=> purchase.video) || []

    if(userVideos.length === 0){ return(
        <>
            <p className="flex flex-col items-center justify-center w-full h-full text-xl text-white">
                You still don't own videos
                <Link href={'/'} className="p-2 mt-4 text-white bg-blue-500 rounded hover:underline"> Visit the store </Link>
            </p>
        </>
    )}

    return (
        <Library userVideos={userVideos} />
    )
}