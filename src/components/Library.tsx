"use client"
import type { video  as  PrismaVideo } from "@/generated/prisma/client"
import { useState } from "react"
import VideoModal from "./VideoModal"

export default function  Library({userVideos}: {userVideos: PrismaVideo[] }) {

    //*  For setting the videoToDisplay
    const [videoId, setVideoId] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleWatchVideo = (videoId: string)=>{
        setIsModalOpen(true)
        setVideoId(videoId)
    }



    return (
        <>
            {isModalOpen &&  <VideoModal videoId={videoId} setIsModalOpen={setIsModalOpen}></VideoModal>}
            
            <div className="h-full w-full p-10">
                <div className="flex flex-col w-full h-full gap-4">
                    {userVideos.map((video, index)=>{
                        return (
                            <div className="w-full flex rounded-xl  bg-[#1f1e1d]" key={index}>

                                
                                {/* //* Video thumbnail and details */}
                                <div className="flex flex-[3]">
                                    <img src={video.thumbnailLocalPath} className="object-cover rounded-xl"></img>
                                </div>
                                <div className="flex flex-col flex-[5] p-4">
                                    <div className="space-y-2">
                                        <p className="text-xl font-semibold text-white">{video.title}</p>
                                        <p className="text-sm text-gray-300">
                                            <span className="font-bold">Views:</span> {video.views}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            <span className="font-bold">Likes:</span> {video.likes}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            <span className="font-bold">Author:</span> {video.author}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            <span className="font-bold">Description:</span> {video.description}
                                        </p>
                                    </div>

                                    {/* //* Download and Watch buttons */}

                                    <div className="flex justify-around gap-4">
                                        <button
                                            className="flex items-center justify-center rounded-lg bg-green-600 text-white p-2 mt-4 hover:bg-green-700 self-center w-[20%] text-center hover:cursor-pointer"
                                            onClick={()=>{handleWatchVideo(video.id)}}
                                        >
                                            <p>Watch</p> 
                                        </button>

                                        {/* //! Read README.md in /api/download-stream-proxy ⚠️⚠️⚠️ */}
                                        <a 
                                            className="flex items-center justify-center rounded-lg bg-red-600 text-white p-2 mt-4   hover:bg-red-700 self-center w-[20%] text-center hover:cursor-pointer"
                                            download={video.title}
                                            href={'/api/download-stream-proxy/' + video.id}
                                        > 
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}