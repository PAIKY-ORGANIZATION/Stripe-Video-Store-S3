'use client';

import { submitRefundRequest } from '@/actions/stripe/submit-refund-request';
import { useState } from 'react';
import toast from 'react-hot-toast';

//prettier-ignore
export default function  PurchaseHistory({relevantSessionDataArray}: {relevantSessionDataArray: RelevantSessionData[]}) {

    const [sessionDetails, setSessionDetails] = useState<RelevantSessionData | null>(null)

    const handleRequestRefund = async (paymentIntentId: string)=>{
        const success = await submitRefundRequest(paymentIntentId)

        if(!success) {toast.error('Refund already requested'); return;}

        toast.success('Refund request submitted')
    }

    return (
        <div className="w-full p-10 bg-[#1f1e1d]">
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
                                onClick={() => setSessionDetails(r)}
                                className="ml-8 text-sm text-white underline hover:underline hover:cursor-pointer"
                            >
                                Details
                            </button>
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-[50%] flex flex-col gap-6 items-center ">
                    {/* //* Video details  */}
                    {sessionDetails?.videos.map((video, i) => (
                        <div key={i} className="flex items-start gap-4 ">
                            <img src={video.image} alt="Thumbnail" className="object-cover w-40 h-auto rounded shadow-md"/>
                            <div className="flex flex-col justify-center gap-2">
                                <p className="text-sm font-bold">
                                    Title: <span className="block text-sm font-normal truncate max-w-[200px]"> {video.title} </span>
                                </p>
                                <p className="text-sm font-bold">
                                    Price: <span className="text-sm font-normal">${video.videoPrice}</span>
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* //* Refund section   */}
                    {sessionDetails && !sessionDetails.wasRefunded &&
                        <button className='text-sm p-1 bg-red-500 hover:cursor-pointer w-[35%] rounded-md'
                            onClick={()=>{handleRequestRefund(sessionDetails.paymentIntentId)}}
                        >
                            Request refund
                        </button>
                    }
                    {
                        sessionDetails?.wasRefunded && 
                        <p className='text-sm font-bold'>This item was refunded</p>
                    }
                </div>
            </div>
        </div>
    )
}
