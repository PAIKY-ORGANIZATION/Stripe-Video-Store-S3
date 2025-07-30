import { loadVideosShow } from "@/actions/load-videos-show"
import VideoShow from "@/components/VideoShow"
import type { video  as  PrismaVideo } from "@/generated/prisma/client"
import { getServerSession } from "next-auth"

export default async function MainPage() {

    const session = await getServerSession()

    

    const videoArray: PrismaVideo[] = await loadVideosShow()

    return (
        <VideoShow videoArray={videoArray}></VideoShow>
    )
}