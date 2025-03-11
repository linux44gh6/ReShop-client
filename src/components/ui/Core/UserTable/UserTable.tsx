'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { Button } from "../../button";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import DeleteConfirmationModal from "../Modal/Modal";
import { deleteProduct } from "@/Service/Products";
import { toast } from "sonner";
import { IUser } from "@/Types/loginData";
import CreateCategoryModal from "../CategoryTable/CreateCategoryModal";

export function UserTable({ data }: { data: IUser[] }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const handleOpenModal = (id: string, item: string) => {
        setModalOpen(true);
        setSelectedId(id);
        setSelectedItem(item);
    };
    console.log(data);
    const handleDelete = async () => {
        if (selectedId) {
            const res = await deleteProduct(selectedId);
            if (res.status === 200) {
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        }
        setModalOpen(false);
    };

    return (
        <div className="w-full overflow-x-auto">
            <Table className="min-w-[600px] sm:min-w-full">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((product:IUser) => (
                        <TableRow key={product?._id}>
                            <TableCell className="font-medium">
                                <Image
                                    src={product?.image}
                                    alt="Image"
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                />
                            </TableCell>
                            <TableCell className="text-sm">{product?.name}</TableCell>
                            <TableCell className="text-sm">${product?.email}</TableCell>
                            <TableCell className="text-sm">{product?.status || "Active"}</TableCell>
                            <TableCell className="flex justify-end gap-2">
                                <Button variant={"ghost"} size="icon">
                                    <Edit className="w-4 h-4 cursor-pointer" />
                                </Button>
                                <Button
                                    variant={"ghost"}
                                    size="icon"
                                    onClick={() => handleOpenModal(product._id, product.name)}
                                >
                                    <Trash className="w-4 h-4 text-red-500 cursor-pointer" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Delete Confirmation Modal (Rendered once outside the loop) */}
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onOpenChange={setModalOpen}
                name={selectedItem}
                onConfirm={handleDelete}
            />
            <CreateCategoryModal />
        </div>
    );
}
