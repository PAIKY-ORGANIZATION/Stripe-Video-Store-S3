'use client';

import { generateStripeSession } from '@/actions/stripe/generate-stripe-session';
import { useCartContext } from '@/components/CartContext';
import Link from 'next/link';
import toast from 'react-hot-toast';

//prettier-ignore
export default function  Cart() {

    const {cart, handleRemoveItem} = useCartContext()

    let total = 0

    cart.forEach((video)=> total += video.videoPrice)

    const handleCheckout = async ()=>{
        const itemIds = cart.map((cartItem)=>cartItem.videoId)

        const response: ActionResponse = await generateStripeSession(itemIds)

        if(!response.success){toast.error(response.message); return}
        
        window.location.href = response.data.sessionUrl
    }

    return (
        <div className="h-full p-6 flex flex-col w-full px-40">
            <div>
                <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
                {cart.length === 0 ? (
                    <div className="flex gap-2">
                        <p className="text-gray-500">Cart is empty.</p> <Link href={'/'} className="text-blue-700 hover:underline"> Go to store</Link>
                    </div>
                ) : (
                        <div className="flex flex-col gap-4 div">
                        {cart.map((item) => (
                            <div key={item.videoId} className="flex items-center justify-between p-1 px-2 bg-purple-600 rounded-xl">
                                <p className="flex-1 text-sm font-medium truncate">{item.videoTitle}</p>
                                <p className="w-20 font-bold text-right">${item.videoPrice.toFixed(2)}</p>
                                <button
                                    onClick={() => handleRemoveItem(item.videoId)}
                                    className="ml-8 text-sm text-white underline hover:underline hover:cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="self-end mt-10">
                <p className="text-lg font-semibold">
                    Total: ${total.toFixed(2)}
                </p>
            </div>
            
            <button 
                className='self-center px-4 py-2 mt-4 font-bold text-white bg-green-600 rounded w-70 hover:bg-green-700 hover:cursor-pointer'
                onClick={handleCheckout}    
            >
                 Proceed to Checkout
            </button>
        </div>
    );
}
