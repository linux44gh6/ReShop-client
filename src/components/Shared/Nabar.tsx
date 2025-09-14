"use client"

import { Button } from "../ui/button"
import { LogOut, MessageCircle, Search, ShoppingBag } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import { useUser } from "@/Context/userContext"
import Spinner from "../Loading/Loading"
import { logOut } from "@/Service/auth"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { getWishlist } from "@/Service/Wishlist"

export default function Navbar() {
  const { user, isLoading, setUser } = useUser()
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    const fetchWishlistCount = async () => {
      if (!user?._id) return
      try {
        const result = await getWishlist(user._id)
        setWishlistCount(result?.data?.length || 0)
      } catch (err) {
        console.error("Failed to fetch wishlist:", err)
      }
    }

    fetchWishlistCount()
  }, [user?._id])

  if (isLoading && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }

  const handleLogout = async () => {
    await logOut()
    setUser(null)
    signOut()
  }

  return (
    <header className="border-b w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container flex justify-between items-center mx-auto h-16 px-4 md:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-black flex items-center">
          <Link href={"/"} className="transition-transform hover:scale-105">
            <span className="text-[#10b981]">Re</span>Shop
          </Link>
        </h1>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-grow max-w-md mx-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search for products"
            className="w-full border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all"
          />
        </div>

        {/* Navbar Items */}
        <nav className="flex items-center gap-3 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-emerald-50 hover:text-[#10b981] transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>

          {user?.role === "user" && (
            <Link href={`/${user.role}/dashboard/wishlist`} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-emerald-50 hover:text-[#10b981] transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#10b981] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          )}

          {user ? (
            <div className="flex gap-2 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-9 w-9 border-2 border-transparent hover:border-[#10b981] transition-all">
                    <AvatarImage
                      src={user?.profileImg || "/default-avatar.png"}
                      alt={user?.name || "User"}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-emerald-100 text-[#10b981]">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 border border-gray-100 shadow-lg rounded-lg p-1">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.name || "User"}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer hover:bg-emerald-50 hover:text-[#10b981] rounded-md transition-colors">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-emerald-50 hover:text-[#10b981] rounded-md transition-colors">
                    <Link href={`/${user?.role}/dashboard`} className="w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-emerald-50 hover:text-[#10b981] rounded-md transition-colors">
                    My Shop
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex gap-2 cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href={"/login"}>
              <Button
                variant="outline"
                className={cn(
                  "rounded-full border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-white",
                  "transition-all duration-200"
                )}
              >
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search for products"
            className="w-full border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all"
          />
        </div>
      </div>
    </header>
  )
}
