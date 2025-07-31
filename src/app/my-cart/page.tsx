"use client"

import { useCartContext } from "@/components/CartContext"




export default function  MyCart() {

    const {cart, handleRemoveItem} = useCartContext()

    
    let total = 0

    cart.forEach((video)=> total + video.videoPrice)

    return (
        <div className="min-h-screen p-6 flex flex-col justify-between">
            <div>
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                {cart.length === 0 ? (
                    <p className="text-gray-500">Cart is empty.</p>
                ) : (
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li
                                key={item.videoId}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <div>
                                    <p className="font-medium">
                                        {item.videoTitle}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        $
                                        {item.videoPrice.toFixed(
                                            2
                                        )}
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        handleRemoveItem(
                                            item.videoId
                                        )
                                    }
                                    className="text-red-500 hover:underline text-sm"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-10 self-end">
                <p className="text-lg font-semibold">
                    Total: ${total.toFixed(2)}
                </p>
            </div>
        </div>
    );
}