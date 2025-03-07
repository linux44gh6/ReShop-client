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
    console.log(data);
    return data
}