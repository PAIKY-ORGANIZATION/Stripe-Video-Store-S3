import { loadVideosShow } from "@/actions/load-videos-show"
import {Store} from "@/components/Store"
import type { video  as  PrismaVideo } from "@/generated/prisma/client"

export default async function StorePage() {
    const videoArray: (PrismaVideo)[] = await loadVideosShow()


    return (
        <Store videoArray={videoArray}></Store>
    )
}