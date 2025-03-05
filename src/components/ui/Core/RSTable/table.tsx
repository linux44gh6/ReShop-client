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

export function RSTable({ data }: { data: IProduct[] }) {
  console.log(data);
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
                <Image src={product?.images[0]} alt="Image" width={50} height={50} className="rounded-md"/>
              </TableCell>
              <TableCell className="text-sm">{product?.title}</TableCell>
              <TableCell className="text-sm">${product?.price}</TableCell>
              <TableCell className="text-sm">{product?.status}</TableCell>
              <TableCell className="text-sm">Mobile</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button variant={"ghost"} size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant={"ghost"} size="icon">
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
