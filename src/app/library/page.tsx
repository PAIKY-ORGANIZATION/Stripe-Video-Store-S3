
import { getUserVideos } from '@/actions/get-user-videos'
import Library from '@/components/Library'
import {getServerSession} from 'next-auth'
import { redirect } from 'next/navigation'



export default async function library() {

    const session = await getServerSession()

    if(!session){ redirect('/api/auth/signin')}

    const userPurchases = await getUserVideos()

    const userVideos = userPurchases

    return (
        <Library userVideos={userVideos} />
    )
}