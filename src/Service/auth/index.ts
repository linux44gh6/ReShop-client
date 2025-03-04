"use server"
import { cookies } from "next/headers";
import {  FieldValues } from "react-hook-form";

export const loginUser= async(payload:FieldValues)=>{
    const res=await fetch(`${process.env.SERVER_URL}/auth/login`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(payload)
    })
    const data=await res.json()
    console.log(data.data.accessToken);
    if(data.success===true){
        (await cookies()).set("token",data.data.accessToken)
    }
    return data
}