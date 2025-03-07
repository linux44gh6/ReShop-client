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
import { IProduct } from "@/Types/products"
import Image from "next/image";
import { Button } from "../../button";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import DeleteConfirmationModal from "../Modal/Modal";
import { deleteProduct } from "@/Service/Products";
import { toast } from "sonner";

export function RSTable({ data }: { data: IProduct[] }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleOpenModal = (id: string, item: string) => {
    setModalOpen(true);
    setSelectedId(id);
    setSelectedItem(item);
  };

  const handleDelete = async() => {
    if (selectedId) {
      const res=await deleteProduct(selectedId);
      if(res.status===200){
        toast.success(res.message)
      }else{
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
            <TableHead>Product</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product?._id}>
              <TableCell className="font-medium">
                <Image
                  src={product?.images[0]}
                  alt="Image"
                  width={50}
                  height={50}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell className="text-sm">{product?.title}</TableCell>
              <TableCell className="text-sm">${product?.price}</TableCell>
              <TableCell className="text-sm">{product?.status || "Pending"}</TableCell>
              <TableCell className="text-sm">{product?.category || "Mobile"}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button variant={"ghost"} size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant={"ghost"} 
                  size="icon" 
                  onClick={() => handleOpenModal(product._id, product.title)}
                >
                  <Trash className="w-4 h-4 text-red-500" />
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
    </div>
  );
}
