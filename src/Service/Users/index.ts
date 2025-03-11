"use server"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const getAllUsers = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("accessToken")?.value || ""
        },
        next: {
            tags: ["user"]
        },
        cache: "no-store"
    })
    const data = await res.json()
    return data
}

export const updateProfile = async (id: string, payload: FieldValues) => {
    const res = await fetch(`${process.env.SERVER_URL}/users/profile/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("accessToken")?.value || ""
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    return data
}