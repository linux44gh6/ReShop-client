"use server"
import { IUser } from "@/Types/loginData";
import { cookies } from "next/headers";
import {  FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode"

export const loginUser= async(payload:FieldValues)=>{
    const res=await fetch(`${process.env.SERVER_URL}/auth/login`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(payload)
        
    })
    const data=await res.json()
    console.log(data);
    console.log(data.data.accessToken);
    if(data.status===201){
        (await cookies()).set("accessToken",data?.data?.accessToken)
    }
    
    return data
}


export const logOut=async()=>{
  (await cookies()).delete("accessToken")
}
export const getUser=async():Promise<IUser|null>=>{
  const token=(await cookies()).get("accessToken")?.value
  if(token){
    const decodedUser=jwtDecode(token) as IUser
    // console.log(decodedUser);
    return decodedUser
  }
  return null
}