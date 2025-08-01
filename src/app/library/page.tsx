
import { getUserVideos } from '@/actions/users-and-videos/get-user-videos'
import Library from '@/components/Library'



export default async function library() {

    const userVideos = await getUserVideos() //$ This it's self takes care of auth.

    if(userVideos.length === 0){ return <p className="flex items-center justify-center w-full h-full text-3xl text-white">No videos found 😔</p>}

    return (
        <Library userVideos={userVideos} />
    )
}