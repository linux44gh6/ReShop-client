"use server"
import { ITransaction } from "@/Types/transaction";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllTransaction = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/transaction`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ["transaction"]
        },
        cache: "no-store"
    })
    const data = await res.json()
    return data
}

export const getSingleTransaction = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/transaction/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: {
            tags: ["transaction"]
        },
        cache: "no-store"
    })
    const data = await res.json()
    return data
}

export const getTransactionByUserId = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/transaction/user/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("accessToken")?.value || ""
        },
        next: {
            tags: ["transaction"]
        },
        cache: "no-store"
    })
    const data = await res.json()
    return data
}

export const deleteTransaction = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/transaction/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
       
        cache: "no-store"
    })
    revalidateTag("transaction")
    const data = await res.json()
    return data
}

export const createTransaction = async(payload:ITransaction) => {
    const res = await fetch(`${process.env.SERVER_URL}/transaction`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("accessToken")?.value || ""
        },
        body: JSON.stringify(payload)
    })
    revalidateTag("transaction")
    const data = await res.json()
    return data
};


