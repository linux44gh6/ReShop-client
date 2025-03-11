import { TransactionTable } from "@/components/ui/Core/TransactionTable";
import { getUser } from "@/Service/auth";
import { getTransactionByUserId } from "@/Service/Transaction";


const TransactionPage = async() => {
    const user=await getUser()
    const transaction=await getTransactionByUserId( user?._id as string)

    return (
        <div>
            <TransactionTable data={transaction} />
        </div>
    );
};

export default TransactionPage;