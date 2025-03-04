"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";

export default function SignupForm() {
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign up</h2>

        <CardContent>
          <div className="grid gap-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="First name" />
              <Input placeholder="Last name" />
            </div>

            {/* Email Field */}
            <Input type="email" placeholder="Work Email" />

            {/* Password Field */}
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Progress value={passwordStrength} className="mt-2 bg-red" />
              <p className="text-xs text-gray-500 mt-1">
                {passwordStrength >= 60
                  ? "Password is okay"
                  : "Use uppercase, numbers & symbols"}
              </p>
            </div>

            {/* Signup Button */}
            <Button className="w-full">
              Create account
            </Button>

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
