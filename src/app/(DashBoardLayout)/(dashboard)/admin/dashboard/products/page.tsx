import { Button } from "@/components/ui/button";
import { RSTable } from "@/components/ui/Core/RSTable/table";

import {  getAllProduct } from "@/Service/Products";
import { Plus } from "lucide-react";
import Link from "next/link";


const page = async() => {

    const {data}=await getAllProduct() 
    console.log(data);
    return (
        <div>
            <div className="flex justify-between border-b pb-2">
                <h1>Manage Product</h1>
                <div>
                    <Link href={"/user/dashboard/post-product"} className="cursor-pointer"><Button variant={"outline"} className="cursor-pointer">Post Product <Plus/></Button></Link>
                </div>
            </div>
            <RSTable data={data}/>
        </div>
    );
};

export default page;