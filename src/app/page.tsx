import { loadVideosShow } from "@/actions/load-videos-show"
import VideoShow from "@/components/VideoShow"
import type { video  as  PrismaVideo } from "@/generated/prisma/client"

export default async function MainPage() {
        


    const videoArray: (PrismaVideo)[] = await loadVideosShow()

    console.log(videoArray);
    

    return (
        <VideoShow videoArray={videoArray}></VideoShow>
    )
}