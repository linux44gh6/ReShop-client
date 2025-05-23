import { RSTable } from "@/components/ui/Core/RSTable/table";

import {  getAllProduct } from "@/Service/Products";


const page = async() => {

    const {data}=await getAllProduct() 
    // const user=await getUser()
    return (
        <div>
            <div className="flex justify-between border-b pb-2">
                <h1>Manage Product</h1>
                {/* <div>
                    <Link href={`/${user?.role}/dashboard/post-product`} className="cursor-pointer"><Button variant={"outline"} className="cursor-pointer">Post Product <Plus/></Button></Link>
                </div> */}
            </div>
            <RSTable data={data}/>
        </div>
    );
};

export default page;