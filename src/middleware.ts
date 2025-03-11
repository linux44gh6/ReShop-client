"use server";

import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./Service/auth";

const authRoutes = ["/login", "/register"];

const roleBasedPrivetRoute = {
  user: [/^\/user/],  // Users can access only /user routes
  admin: [/^\/admin/] // Admins can access only /admin routes
} as const;

type Role = keyof typeof roleBasedPrivetRoute;

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Get user info
  const userInfo = await getUser();
  console.log(userInfo);

  // If user is not authenticated
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }

  // Ensure user role exists in roleBasedPrivetRoute
  const userRole = userInfo.role as Role;

  if (userRole in roleBasedPrivetRoute) {
    const allowedRoutes = roleBasedPrivetRoute[userRole];

    if (allowedRoutes.some((route) => route.test(pathname))) {
      return NextResponse.next(); // Allow access
    } else {
      // Redirect to the correct dashboard if the user tries to access a restricted page
      return NextResponse.redirect(
        new URL(`/`, request.url) // Redirect to the correct dashboard
      );
    }
  }

  // Default deny (fallback) - redirect to login
  return NextResponse.redirect(new URL("/login", request.url));
};

// Apply middleware to role-based routes
export const config = {
  matcher: [
    "/login",
    "/register",
    "/user",
    "/user/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
