"use client"





export default function  VideoShow({videoArray}: {videoArray: Video[] }) {
    return (
        <div className="h-full bg-[#171615] w-full p-10">
            <div className="w-full h-full border">
                {videoArray.map((video, index)=>{
                    return (
                        <div className="border w-full">
                            ñalksd
                        </div>
                    )
                })}

            </div>
        </div>
    )
}