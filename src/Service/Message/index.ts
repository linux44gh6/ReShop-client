/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { cookies } from "next/headers"

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