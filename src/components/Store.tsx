"use client"

import { generateStripeSession } from "@/actions/generate-stripe-session"
import type { video  as  PrismaVideo } from "@/generated/prisma/client"
import { toast } from "react-hot-toast"


type VideoObjectLocalStorage = {
    videoId: string,
    videoTitle: string,
    videoPrice: number
}

export  function  Store({videoArray}: {videoArray: PrismaVideo[] }) {

    const handleBuy = async (videoId: string)=>{
    
        const createSessionResponse = await generateStripeSession(videoId)

        if(!createSessionResponse.success){
            toast.error(createSessionResponse.message)
            return
        }

        window.location.href = createSessionResponse.data.sessionUrl as string

        return
    }

    const handleAddToCart = (videoId: string, videoPrice: number, videoTitle: string)=>{


        //* Parsing the ids array.
        const localStorageJSONold: VideoObjectLocalStorage[] = JSON.parse(localStorage.getItem('cart') || '[]') || [] 

        //* If there is an object with the same video ID that's being added, don't add it
        if(!localStorageJSONold.find((videoOject: VideoObjectLocalStorage)=> videoOject.videoId === videoId)){

            const localStorageJSONnew = [...localStorageJSONold, {videoId, videoTitle, videoPrice}]

            console.log({localStorageJSONnew});
            

            localStorage.setItem('cart', JSON.stringify(localStorageJSONnew)) //* Setting the local storage back to a stringified array
        }


    }

    return (
        <div className="h-full bg-[#171615] w-full p-10">
            <div className="w-full h-full gap-4 flex flex-col">
                {videoArray.map((video, index)=>{
                    return (
                        <div className="w-full flex rounded-xl  bg-[#1f1e1d]" key={index}>
                            <div className="flex flex-[3]">
                                <img src={video.thumbnailLocalPath} className="rounded-xl"></img>
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
                                <div className="flex gap-4 justify-around">

                                    <button
                                        className="flex items-center justify-center rounded-lg bg-green-600 text-white p-2 mt-4 hover:bg-green-700 self-center w-[20%] text-center hover:cursor-pointer"
                                        onClick={()=>{handleBuy(video.id)}}
                                    >
                                        Buy for {video.price}$ 
                                    </button>
                                    <button
                                        className="flex items-center justify-center rounded-lg bg-blue-500 text-white p-2 mt-4 hover:bg-blue-700 self-center w-[20%] text-center hover:cursor-pointer"
                                        onClick={()=>{handleAddToCart(video.id, video.price, video.title)}}
                                    >
                                        Add to cart
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}