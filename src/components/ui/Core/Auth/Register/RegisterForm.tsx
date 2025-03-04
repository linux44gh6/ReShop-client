/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidationSchema } from "./registerValidation";
import Link from "next/link";

export default function SignupForm() {
  const form = useForm({
    resolver:zodResolver(registerValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Function to check password strength
  const checkStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 30;
    if (/[A-Z]/.test(password)) strength += 30;
    if (/\d/.test(password)) strength += 20;
    if (/[\W_]/.test(password)) strength += 20;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value;
    setPassword(pass);
    setPasswordStrength(checkStrength(pass));
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    handlePasswordChange(data.password);
    console.log(data);
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign up</h2>

        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl>
                        <Input type="text" placeholder="Your Name" className="p-3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl>
                        <Input type="email" placeholder="Email Address" className="p-3" {...field} />
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
                        <Input
                          type="password"
                          placeholder="Password"
                          
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
              <Progress value={passwordStrength} className=" bg-red" />
              <p className="text-xs text-gray-500 mt-1">
                {passwordStrength >= 60
                  ? "strong password"
                  : "Use uppercase, numbers & symbols"}
              </p>
            </div>
               {/* Signup Button */}
            <Button type="submit" className="w-full cursor-pointer">
              Create account
            </Button>
              </form>
              <p>Don&apos;t have an account?<Link href={'/login'} className="text-blue-500">Sign in</Link></p>
            </Form>
            {/* Password Field */}
           

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Social Signup Buttons */}
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="flex items-center gap-2 w-full">
                <FcGoogle className="text-lg" /> Sign up with Google
              </Button>
              <Button variant="outline" className="flex items-center gap-2 w-full">
                <FaMicrosoft className="text-blue-600" /> Sign up with Microsoft
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
