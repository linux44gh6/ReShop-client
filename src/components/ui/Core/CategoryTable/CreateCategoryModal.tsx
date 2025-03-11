/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import ImageUploader from "../ImageUploader";
import ImagePreviewer from "../ImageUploader/ImagePreviewer";

import { sendImagesToCloudinary } from "@/Constans";
import { Button } from "../../button";
import { createCategory } from "@/Service/Category";
import { toast } from "sonner";

const CreateCategoryModal = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const form = useForm();
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
  const images=await sendImagesToCloudinary(imageFiles)
  console.log(images);
  const payload={...data,icon:images}
  console.log(payload);
  const res=await createCategory(payload)
  console.log(res);
  if(res.status===200){
    toast.success(res.message)
  }else{
    toast.error(res.message)
  }
  console.log(payload);
  } catch (error) {
    console.log(error);
  }
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Product Category</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between mt-5">
              
              {imagePreview.length > 0 ? (
                <ImagePreviewer
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  className="mt-8"
                />
              ) : (
                <div className="mt-8">
                  <ImageUploader
                    imageFiles={imageFiles}
                    setImageFiles={setImageFiles}
                    setImagePreview={setImagePreview}
                    label="Upload Icon"
                  />
                </div>
              )}
            </div>

            <Button type="submit" className="mt-5 w-full">
              {isSubmitting?"Creating....":"Create"}
          
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;