"use client"

import type { video  as  PrismaVideo } from "@/generated/prisma/client"
import { toast } from "react-hot-toast"
import { useCartContext } from "./CartContext"
import { generateStripeSession } from "@/actions/stripe/generate-stripe-session"




export  function  Store({videoArray}: {videoArray: PrismaVideo[] }) {

    const {handleAddItem} = useCartContext()

    const handleBuy = async (videoId: string)=>{
    
        const createSessionResponse = await generateStripeSession([videoId]) //$ This func. only accepts an array

        if(!createSessionResponse.success){
            toast.error(createSessionResponse.message)
            return
        }

        window.location.href = createSessionResponse.data.sessionUrl as string

        return
    }

    const handleAddToCart = (videoId: string, videoPrice: number, videoTitle: string)=>{

        const cartItem: CartVideoObject = { videoId, videoPrice, videoTitle}
        
        const success = handleAddItem(cartItem)
        
        success ? toast.success('Item added to cart'): toast.error('Item already in cart')


    }

    return (
        <div className="h-full bg-[#171615] w-full p-10">
            <div className="flex flex-col w-full h-full gap-4">
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
                                <div className="flex justify-around gap-4">

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