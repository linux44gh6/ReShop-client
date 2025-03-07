import { Button } from "@/components/ui/button";
import { RSTable } from "@/components/ui/Core/RSTable/table";
import { getUser, } from "@/Service/auth";

import {  getProductByUserId } from "@/Service/Products";
import { Plus } from "lucide-react";
import Link from "next/link";


const page = async() => {
    const user = await getUser()
    console.log(user);
    const {data}=await getProductByUserId(user?._id as string) 
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