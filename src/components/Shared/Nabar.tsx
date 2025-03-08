"use client"
import { Button } from "../ui/button";
import { LogOut, MessageCircle, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useUser } from "@/Context/userContext";
import Spinner from "../Loading/Loading";
import { logOut } from "@/Service/auth";

export default function Navbar() {
  const { user, isLoading, setIsLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const handleLogout = async () => {
    await logOut();
    setIsLoading(true);
  };

  return (
    <header className="border-b w-full bg-white shadow-md sticky ">
      <div className="container flex justify-between items-center mx-auto h-16 px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-black flex items-center">
          <span className="text-[#10b981]">Re</span>Shop
        </h1>
        <div className="hidden md:flex flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full border border-gray-300 rounded-full py-2 px-5 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
          />
        </div>
        <nav className="flex items-center gap-2 md:gap-4">
          <Button variant="outline" className="rounded-full p-0 size-10">
            <MessageCircle />
          </Button>
          <Link href={'/cart'}>
            <Button variant="outline" className="rounded-full p-0 size-10">
              <ShoppingBag />
            </Button>
          </Link>
          {user ? (
            <div className="flex gap-2 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 mt-3 border 
                border-[ #10b981]">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href={`${user.role}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">My Shop</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex gap-2 cursor-pointer">
                    <LogOut /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href={'/login'}>
              <Button variant={'outline'} className="rounded-full">Login</Button>
            </Link>
          )}
        </nav>
      </div>
      <div className="md:hidden px-4 py-2">
        <input
          type="text"
          placeholder="Search for products"
          className="w-full border border-gray-300 rounded-full py-2 px-5 focus:outline-none focus:ring-2 focus:ring-[#10b981]"
        />
      </div>
    </header>
  );
}
