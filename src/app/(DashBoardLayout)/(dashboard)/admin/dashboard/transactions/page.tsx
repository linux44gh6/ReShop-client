import { TransactionTable } from "@/components/ui/Core/TransactionTable";
import { getAllTransaction, } from "@/Service/Transaction";
const TransactionPage = async() => {
    const transaction=await getAllTransaction()
    return (
        <div>
            <TransactionTable data={transaction} />
        </div>
    );
};

export default TransactionPage;