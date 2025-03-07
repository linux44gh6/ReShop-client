"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const getAllProduct=async()=>{
    const res=await fetch(`${process.env.SERVER_URL}/listings`,{
        method:"GET",
        headers: {
            "Content-Type": "application/json"
        },
        next:{
            tags:["product"]
        },
        cache:"no-store"
    })
   
    const data=await res.json()
    return data
}

export const getProductByUserId=async(userId:string)=>{
    const res=await fetch(`${process.env.SERVER_URL}/listings/user/${userId}`,{
        method:"GET",
        headers: {
            "Content-Type": "application/json"
        },
        next:{
            tags:["product"]
        },
        cache:"no-store"
    })
   
    const data=await res.json()
    return data
}

export const deleteProduct=async(id:string)=>{
    const res=await fetch(`${process.env.SERVER_URL}/listings/${id}`,{
        method:"DELETE",
        body:JSON.stringify({id}),
        headers: {
            Authorization: (await cookies()).get("accessToken")?.value || ""
        },
    })
    revalidateTag("product")
    const data=await res.json()
    return data
}

export const createProduct=async(payload:FormData)=>{
   

   console.log(payload);
}   