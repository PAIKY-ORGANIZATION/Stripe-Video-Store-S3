import { loadVideosShow } from "@/actions/load-videos-show"
import VideoShow from "@/components/VideoShow"
// import type { Video } from "@/generated/prisma-client/index"

export default async function MainPage() {

    const videoArray: Video[] = await loadVideosShow()

    return (
        <VideoShow videoArray={videoArray}></VideoShow>
    )
}