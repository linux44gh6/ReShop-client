"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const getAllProduct = async () => {
    try {
        // const query = new URLSearchParams({
        //     search: searchTerm, 
        // }).toString();

        const url = `${process.env.SERVER_URL}/listings`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                tags: ["product"],
            },
            cache: "no-store",
        });

        // Check if response is okay
        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Ensure the error propagates
    }
};



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

export const createProduct=async(payload:FieldValues)=>{
   try{
    const res=await fetch(`${process.env.SERVER_URL}/listings`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("accessToken")?.value || ""
        },
        body:JSON.stringify(payload)
    })
    revalidateTag("product")
    const result=await res.json()
    return result
   }catch(e){
    console.log(e);
   }
}   

export const getSingleProduct=async(id:string)=>{
    const res=await fetch(`${process.env.SERVER_URL}/listings/${id}`,{
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