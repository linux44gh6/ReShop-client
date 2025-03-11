import { getAllProduct } from "@/Service/Products";
import { getAllUsers } from "@/Service/Users";
import { BarChartGraph } from "@/components/BarChart/BarChart";
import { VisitorsGraph } from "@/components/VisitorsGraph/visitorsGraph";
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
const AdminDashboard = async () => {
 const userData=await getAllUsers()
const totalProduct=await getAllProduct()
    return (
        <div className=" ">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full justify-between gap-4">
                <div className="">
                    <Card className=" h-76 bg-[#10b981] text-white">
                        <CardContent>
                            <h2 className="font-bold text-2xl text-center">Total Product</h2>
                            <h1 className=" font-bold text-5xl text-center mt-10">{totalProduct?.data.length}</h1>
                        </CardContent>
                    </Card>
                </div>
                <div className="">
                <Card className="h-76 bg-amber-500 text-white">
                        <CardContent>
                            <h2 className="font-bold text-2xl text-center">Total User</h2>
                            <h1 className=" font-bold text-5xl text-center mt-10">{userData?.data.length}</h1>
                        </CardContent>
                    </Card>
                </div>
                <div className=" h-32 bg-teal-200 rounded-2xl shadow-2xl">
                    <VisitorsGraph/>
                </div>
            </div>
            <BarChartGraph/>
        </div>
    );
};

export default AdminDashboard;