import { loadVideosShow } from "@/actions/users-and-videos/load-videos-show"
import {Store} from "@/components/Store"
import type { video  as  PrismaVideo } from "@/generated/prisma/client"
import Link from "next/link"

export default async function StorePage() {
    const videoArray: (PrismaVideo)[] = await loadVideosShow()
    if(videoArray.length === 0){ return(
        <>
            <p className="flex flex-col items-center justify-center w-full h-full text-2xl text-white">
                You already own all the videos
                <Link href={'/'} className="p-2 mt-4 text-white bg-blue-500 rounded hover:underline"> Go to your library </Link>
            </p>
        </>
    )}

    return (
        <Store videoArray={videoArray}></Store>
    )
}