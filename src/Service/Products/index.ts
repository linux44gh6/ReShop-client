export const getAllProduct=async()=>{
    const res=await fetch(`${process.env.SERVER_URL}/listings`,{
        method:"GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    const data=await res.json()
    return data
}