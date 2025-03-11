"use client";
import notFound from "@/assets/pageNotFound.svg"
import Image from "next/image";
 const notfound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
                <Image src={notFound} alt="page not found" width={500} height={500}/>
        </div>
    );
};

export default notfound;

