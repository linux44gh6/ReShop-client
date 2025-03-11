'use server'
import { IWishlist } from "@/Types/wishlist"
import { revalidateTag } from "next/cache"


export const getWishlist = async (id:string) => {
    const res = await fetch(`${process.env.SERVER_URL}/wishlist/user/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ["wishlist"],
        }
    })

    const data = await res.json()
    return data
}
export const createWishlist = async ( payload:IWishlist) => {
    console.log(payload,"from service");
    const res = await fetch(`${process.env.SERVER_URL}/wishlist`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    revalidateTag("wishlist")
    const data = await res.json()
    return data
}

export const deleteWishlist = async (id:string) => {
    const res = await fetch(`${process.env.SERVER_URL}/wishlist/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    revalidateTag("wishlist")
    const data = await res.json()
    return data
}
