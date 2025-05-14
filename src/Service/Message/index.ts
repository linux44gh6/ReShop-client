/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers"

export const createMessage=async(payload:any)=>{
    console.log(payload,"fron server");
    const res=await fetch(`${process.env.SERVER_URL}/message`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
           Authorization: (await cookies()).get("accessToken")?.value || ""
        },
        body:JSON.stringify(payload),
    })
    const result=await res.json()
    revalidateTag('message')
    return result
}
export const getMessage=async(payload:any)=>{
    console.log(payload,"fron server");
    const res=await fetch(`${process.env.SERVER_URL}/message/${payload}`,{
        method:"GET",
        headers:{
           
           Authorization: (await cookies()).get("accessToken")?.value || ""
        },
       next:{tags:['message']}
    })
    const result=await res.json()
    return result
}