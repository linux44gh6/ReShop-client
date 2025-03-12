import UserProfile from "@/components/Profile/profile";
import { authOptions } from "@/Utils/authOption";
import { getServerSession } from "next-auth";

const UserDashboard = async() => {
    const seeason=await getServerSession(authOptions)
    console.log(seeason?.user);
    return (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <UserProfile/>
          </div>
    );
};

export default UserDashboard;