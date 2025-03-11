
import { CategoryTable } from "@/components/ui/Core/CategoryTable/CategoryTable";
import CreateCategoryModal from "@/components/ui/Core/CategoryTable/CreateCategoryModal";
import { getAllCategory } from "@/Service/Category";

const CategoriesPage = async () => {
    const data = await getAllCategory()
    return (
        <div>
            <div className="flex justify-between border-b pb-2">
                <h1>Manage Categories</h1>
                <div>

                    <CreateCategoryModal />
                </div>
            </div>
            <CategoryTable data={data} />
        </div>
    );
};

export default CategoriesPage;