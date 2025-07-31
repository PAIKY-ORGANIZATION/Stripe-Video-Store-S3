"use client"

import React, { createContext, useContext, useState } from "react";



type CartContextValue = {
    cart: CartVideoObject[], handleAddItem: (video: CartVideoObject)=>boolean, handleRemoveItem: (videoId: string)=>void
} 


const CartContext = createContext<CartContextValue | null>(null)



export default function  CartContextProvider({children}: {children: React.ReactNode}) {

    const [cart, setCart] = useState<CartVideoObject[]>([])

    const handleAddItem = (video: CartVideoObject)=>{
        const exists = cart.find((videoObject)=> videoObject.videoId === video.videoId)

        if(exists) return false
        
        setCart([...cart, video])
        return true //* Just to inform the client that the item already exists in the cart
    }

    const handleRemoveItem = (videoId: string)=>{
        const updatedCart = cart.filter((video)=> video.videoId !== videoId)
        setCart(updatedCart)
    
    }

    const value = {cart, handleAddItem, handleRemoveItem}
    //$ Pretty much globalizing the useState and that's it.

    return (
        <CartContext value={value}>{children}</CartContext>
    )
}

export const useCartContext = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCartContext must be used within a CartContextProvider');
    }
    return context;
};