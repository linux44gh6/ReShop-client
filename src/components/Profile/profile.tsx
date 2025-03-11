"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem,  FormMessage } from "../ui/form";
import { sendImagesToCloudinary } from "@/Constans";
import { updateProfile } from "@/Service/Users";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { getUser } from "@/Service/auth";
import { IUser } from "@/Types/loginData";

interface UserProfileData {
    name: string;
    phone_number: string;
    profileImg: string;
}

export default function UserProfile() {
   const [user,setUser]=useState<IUser|null>(null)
   useEffect(() => {
       const userInfo=async()=>{
           const user=await getUser()
           setUser(user)
       }
       userInfo()
   },[])
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const [isEditing, setIsEditing] = useState(false);
    
    console.log(user,"form user");
    // Initial user data (Replace with API data if needed)
    const form = useForm<UserProfileData>({
        defaultValues:{
            name:'',
            phone_number:'',
            profileImg:'',
        }
    });


    const { handleSubmit, } = form;
    // Handle Image Preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
      if (file) {
          setImageFiles([file]);
      }
    };

    // Handle Form Submit (Save Changes)
    const onSubmit =async (data: UserProfileData) => {
        const Image=await sendImagesToCloudinary(imageFiles)
        console.log(Image);
        const payload={...data,profileImg:Image[0]};
        if(!user?._id){
            toast.error("User ID is missing");
            redirect  ("/login");
        }
        const res=await updateProfile(user?._id,payload)
        console.log(res);
        if(res.status===200){
            toast.success(res.message)
        }else{
            toast.error(res.message)
        }
        console.log(payload);
        setIsEditing(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-bold">User Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    {!isEditing ? (
                        // View Mode: Display User Details
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="w-24 h-24 border">
                                <AvatarImage src={user?.profileImg} />
                                <AvatarFallback>Profile</AvatarFallback>
                            </Avatar>
                            <div className="text-lg font-semibold">{user?.name}</div>
                            <div className="text-gray-600">{user?.phone_number}</div>
                            <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                                Edit Profile
                            </Button>
                        </div>
                    ) : (
                        // Edit Mode: Form for Updating User Details
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Profile Picture Upload */}
                                <div className="flex flex-col items-center gap-3">
                                   
                                    <Label htmlFor="profilePic" className="cursor-pointer text-blue-600 hover:underline">
                                        Change Profile Picture
                                    </Label>
                                    <Input type="file" accept="image/*" onChange={handleImageChange} />
                                </div>

                                {/* Name Input */}
                                <div>
                                    <Label htmlFor="name">Your Name</Label>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="text" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Phone Input */}
                                <div>
                                    <Label htmlFor="phone">Your Phone Number</Label>
                                    <FormField
                                        control={form.control}
                                        name="phone_number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="text" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between">
                                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                                        Save
                                    </Button>
                                    <Button type="button" onClick={() => setIsEditing(false)} className="bg-gray-400 hover:bg-gray-500">
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
