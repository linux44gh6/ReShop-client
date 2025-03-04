"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import Image from "next/image";
import logIn from "@/assets/LoginImage.jpg"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginValidationSchema } from "./logingValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
    const form = useForm({
        resolver:zodResolver(loginValidationSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });
    const handleSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
        console.log(data);
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="flex flex-row w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
                {/* Left Side - Image */}
                <div className="hidden md:flex w-1/2  p-6">
                    <Image
                        src={logIn}
                        alt="Login Illustration"
                        className="w-full h-auto object-cover rounded-lg"
                        width={500}
                        height={500}
                    />
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back</h2>

                    <CardContent>
                        <div className="">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel />
                                                <FormControl>
                                                    <Input type="email" placeholder="Email  Address" className="p-3" {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel />
                                                <FormControl>
                                                    <Input type="password" placeholder="Email Address" className="p-3" {...field} />
                                                </FormControl>
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full  text-white cursor-pointer">Sign In</Button>
                                </form>
                            </Form>

                            {/* Divider */}
                            <div className="relative flex items-center my-4">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="mx-3 text-gray-500 text-sm">or</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            {/* Social Login */}
                            <div className="flex flex-col gap-2">
                                <Button variant="outline" className="flex items-center gap-2 w-full">
                                    <FcGoogle className="text-red-500" /> Sign in with Google
                                </Button>
                                <Button variant="outline" className="flex items-center gap-2 w-full">
                                    <FaMicrosoft className="text-blue-600" /> Sign in with Microsoft
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}
