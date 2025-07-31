"use client"
import type { video  as  PrismaVideo } from "@/generated/prisma/client"

export default function  Library({userVideos}: {userVideos: PrismaVideo[] }) {
    return (
        <div className="h-full bg-[#171615] w-full p-10">
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
                                        <span className="font-medium text-white">Views:</span> {video.views}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        <span className="font-medium text-white">Likes:</span> {video.likes}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        <span className="font-medium text-white">Author:</span> {video.author}
                                    </p>
                                </div>

                                {/* //* Download and Watch buttons */}

                                <div className="flex justify-around gap-4">
                                    <button
                                        className="flex items-center justify-center rounded-lg bg-green-600 text-white p-2 mt-4 hover:bg-green-700 self-center w-[20%] text-center hover:cursor-pointer"
                                        onClick={()=>{console.log('test1');}}
                                    >
                                        <p>Watch</p> 
                                    </button>
                                    <a 
                                        className="flex items-center justify-center rounded-lg bg-red-600 text-white p-2 mt-4   hover:bg-red-700 self-center w-[20%] text-center hover:cursor-pointer"
                                        download={video.title}
                                        href={'/api/download/' + video.id}
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
    )
}