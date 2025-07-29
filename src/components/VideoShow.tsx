"use client"





export default function  VideoShow({videoArray}: {videoArray: Video[] }) {
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
                                        <span className="font-medium text-white">Price:</span> {video.price} {video.currency}
                                    </p>
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
                                <button className="flex items-center justify-center rounded-lg bg-green-600 text-white p-2 mt-4 hover:bg-green-700 self-center w-[15%] text-center hover:cursor-pointer">
                                    <p>Buy</p> 
                                </button>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}