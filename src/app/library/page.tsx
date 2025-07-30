import { getUserVideos } from '@/actions/get-user-videos'
import {getServerSession} from 'next-auth'
import { redirect } from 'next/navigation'



export default async function library() {

    const session = await getServerSession()

    if(!session){ redirect('/api/auth/signin')}

    const userVideos = await getUserVideos()

    return (
        <div>library</div>
    )
}