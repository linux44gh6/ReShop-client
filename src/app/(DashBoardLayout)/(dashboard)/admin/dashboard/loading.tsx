
import { Skeleton } from "@/components/ui/skeleton"
import { getAllProduct } from "@/Service/Products";
import { Key } from "react";

const Loading = async() => {
    const product=await getAllProduct()
    
    return (
        <div className="gird grid-cols-1 gap-32">
            {
                product.data.map((d: { _id: Key | null | undefined; })=>(
                    <Skeleton key={d._id} className="w-full h-[20px] rounded-full" />
                ))
            }
            
        </div>
    );
}

export default Loading;
