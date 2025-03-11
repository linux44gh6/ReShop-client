import { UserTable } from "@/components/ui/Core/UserTable/UserTable";
import { getAllUsers } from "@/Service/Users";

const UserPage = async() => {
    const users=await getAllUsers()
    console.log(users,"form suer");
    return (
        <div>
                 <UserTable data={users}/>
        </div>
    );
};

export default UserPage;