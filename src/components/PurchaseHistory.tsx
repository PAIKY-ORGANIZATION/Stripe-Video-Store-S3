'use client';

import { useState } from 'react';

//prettier-ignore
export default function  PurchaseHistory({relevantSessionDataArray}: {relevantSessionDataArray: RelevantSessionData[]}) {

    const [productDetails, setProductDetails] = useState<RelevantSessionData['videos']>([])

    return (
        <div className="w-full p-10">
            <h1 className="mb-4 text-2xl font-bold">Your Purchase History</h1>
            
            {/* //* Purchase rows  */}

            <div className="flex gap-4">
                <div className="flex flex-col gap-4 max-w-[50%] w-full">
                    {relevantSessionDataArray.map((r, i) => (
                        <div key={i} className="flex items-center justify-between gap-2 p-1 px-2 bg-purple-600 rounded-xl">
                            <p className="text-sm font-medium truncate w-70 ">{r.checkoutSessionId}</p>
                            <p className="font-bold text-right w-30 ">{r.date}</p>
                            <p>${r.total}</p>
                            <button
                                onClick={() => setProductDetails(r.videos)}
                                className="ml-8 text-sm text-white underline hover:underline hover:cursor-pointer"
                            >
                                Details
                            </button>
                        </div>
                    ))}
                </div>


                {/* //* Video details  */}

                <div className="w-full max-w-[50%] flex flex-col gap-6 p-6">
                    {productDetails.map((video, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <img
                                src={video.image}
                                alt="Thumbnail"
                                className="object-cover w-40 h-auto rounded shadow-md"
                            />
                            <div className="flex flex-col justify-center gap-2">
                                <p className="text-sm font-bold">
                                    Title:
                                    <span className="block text-sm font-normal truncate max-w-[200px]">
                                        {video.title}
                                    </span>
                                </p>
                                <p className="text-sm font-bold">
                                    Price:
                                    <span className="text-sm font-normal">${video.videoPrice}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
