// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./Service/auth";


const authRoutes = ["/login", "/register"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getUser();

  // If user is not logged in
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next(); // allow login/register
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/all-product/:path*",
    // "/details/:path*",
    "/checkout",
  ],
};
