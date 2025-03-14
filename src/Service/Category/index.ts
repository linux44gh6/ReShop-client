"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const getAllCategory = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/category`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },    
        next: {
            tags: ["category"]
        },    
        cache: "no-store"
    })
    const data = await res.json()
    return data
}

export const createCategory = async (payload:FieldValues) => {
    const res = await fetch(`${process.env.SERVER_URL}/category`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("accessToken")?.value || ""
        },
        body: JSON.stringify(payload)
    })
    revalidateTag("category")
    const data = await res.json()
    return data
}