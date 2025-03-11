"use client";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUploader from "../ui/Core/ImageUploader";
import ImagePreviewer from "../ui/Core/ImageUploader/ImagePreviewer";
import { ICategory, ICategoryResponse } from "@/Types/category";
import { useState } from "react";
import { useUser } from "@/Context/userContext";
import { createProduct } from "@/Service/Products";

import { sendImagesToCloudinary } from "@/Constans";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { locations } from "@/Constans/location";
const productSchema = z.object({
  title: z.string().min(2, "Title is required"),
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  condition: z.string().min(1, "Condition is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z.array(z.any()),
  location: z.string().min(1, "Location is required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

const ProductForm = ({ Category }: { Category:ICategoryResponse }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const user=useUser()
  const router=useRouter()
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: "",
      category: "",
      condition: "",
      description: "",
      images: [],
      location:''
    },
  });
  const {
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (values: FieldValues) => {
   try{
    const images=await sendImagesToCloudinary(imageFiles)
    values.price=Number(values.price)
    const payload={...values,images,userID:user?.user?._id,status:"available"}
    console.log(payload);
    const res=await createProduct(payload)
    if(res.status===200){
      toast.success(res.message)
      router.push("/user/dashboard/products")
    }else{
      toast.error(res.message)}
    console.log(res);
   }catch(e){
    console.log(e);
   }
    
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Post Product</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter product price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Category</FormLabel>
                  <Select  onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      {Category?.data.map((category:ICategory, index:number) => (
                        <SelectItem key={index} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Condition */}
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Condition</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="used">Used</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        locations.map((location, idx) => (
                          <SelectItem key={idx} value={location.district}>
                            {location.district}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Enter product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <div className="col-span-2">
              <FormLabel>Product Image</FormLabel>
              <div className="flex gap-5">
                <ImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}

                  imageFiles={imageFiles}
                />
                <ImagePreviewer
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  imagePreview={imagePreview}
                  className="flex flex-wrap gap-5"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full col-span-2 cursor-pointer">
              {isSubmitting?"Posting...":"Post Product"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
