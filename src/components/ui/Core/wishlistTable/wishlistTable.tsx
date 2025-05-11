/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { IWishlist } from "@/Types/wishlist";

export function WishlistTable({ data }: { data:any }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    console.log(data);
    const handleOpenModal = (id:any, item: string) => {
        setModalOpen(true);
        setSelectedId(id);
        setSelectedItem(item);
    };;
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
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((product: IWishlist) => (
                        console.log(product,"product"),
                        <TableRow key={product?._id}>
                            <TableCell className="font-medium">
                                <Image
                                    src={product?.products.images[0]||"https://res.cloudinary.com/da1t0c7he/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1741626833/vac89dpcaj5rw96e7maq.webp"}
                                    alt="Image"
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                />
                            </TableCell>
                            <TableCell className="text-sm">{product?.products?.title}</TableCell>
                            <TableCell className="text-sm">${product?.products?.price}</TableCell>
                            <TableCell className="text-sm">{product?.products?.status}</TableCell>
                            <TableCell className="flex justify-end gap-2">
                                <Button variant={"ghost"} size="icon">
                                    <Edit className="w-4 h-4 cursor-pointer" />
                                </Button>
                                <Button
                                    variant={"ghost"}
                                    size="icon"
                                    onClick={() => handleOpenModal(product._id, product.products.title)}
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
            {/* <CreateCategoryModal /> */}
        </div>
    );
}
