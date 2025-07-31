
import { getUserVideos } from '@/actions/get-user-videos'
import Library from '@/components/Library'
import {getServerSession} from 'next-auth'
import { redirect } from 'next/navigation'



export default async function library() {

    const session = await getServerSession()

    if(!session){ redirect('/api/auth/signin')}

    const userPurchases = await getUserVideos()

    const userVideos = userPurchases

    if(userVideos.length === 0){ return <p className="flex items-center justify-center w-full h-full text-3xl text-white">No videos found 😔</p>}

    return (
        <Library userVideos={userVideos} />
    )
}