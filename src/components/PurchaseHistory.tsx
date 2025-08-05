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

        toast.success('Refund request submitted to support')
    }

    return (
        <div className="w-full p-7">
            <h1 className="mb-30 text-2xl font-bold text-center">Order history</h1>
            
            {/* //* Purchase rows  */}

            <div className="flex gap-4">
                <div className="flex flex-col gap-4 max-w-[60%] w-full">
                    {relevantSessionDataArray.map((r, i) => (
                        <div key={i} className="flex items-center justify-between gap-2 p-1 px-2 bg-purple-600 rounded-xl">
                            <p className="text-sm font-medium truncate w-70 ">{r.checkoutSessionId}</p>
                            <p className="text-sm w-30  whitespace-nowrap">{r.date}</p>
                            <p className='font-bold text-sm'>${r.total}</p>
                            <button
                                onClick={() => setSessionDetails(r)}
                                className="ml-8 text-sm text-white underline hover:underline hover:cursor-pointer"
                            >
                                Details
                            </button>

                            {r.wasRefunded ? 
                                <p className="ml-4 text-sm text-white whitespace-nowrap font-bold">Item Refunded</p>
                                :
                                <button className="ml-4 text-sm text-white  whitespace-nowrap underline hover:underline hover:cursor-pointer" onClick={()=>{handleRequestRefund(r.paymentIntentId)}}>
                                    Req. Refund
                                </button>
                            }
                            {r.hasDispute && <p className="ml-4 text-sm text-white whitespace-nowrap font-bold">Disputed ⚠️</p>}
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-[40%] flex flex-col gap-6 items-center ">
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
                    {
                        sessionDetails?.wasRefunded && 
                        <p className='text-sm font-bold'>This item was refunded</p>
                    }
                </div>
            </div>
            <div className='mt-30 w-[50%]'> 
                <h1 className="text-xl font-bold"> How refunds work?</h1>
                <p className="text-sm">If you are not satisfied with your purchase, you can request a refund. Our team will review your request and process the refund. Please note that Refunds will be processed within 5 business days.</p>
            </div>
        </div>
    )
}
