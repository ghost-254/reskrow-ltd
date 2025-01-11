import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "./utils/firebase/admin";

const protectedRoutes = [
  "/properties",
  "/properties/create",
  "/properties/edit",
  "/buy",
  "/sell",
  "/rent",
  "/profile",
  "/saved-properties",
  "/my-listings",
  "/settings",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (req.nextUrl.pathname === "/logout") {
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.delete("session");

    console.log("Response cookies:", response.cookies.getAll());

    return response;
  }

  // Check if the route is protected
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("session")?.value;

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth";
      url.searchParams.set("redirectTo", req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    try {
      // Call the validation API to verify the token
      const response = await fetch(
        `${req.nextUrl.origin}/api/validate-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );

      const result = await response.json();

      if (!result.valid) {
        throw new Error(result.error || "Invalid token");
      }

      console.error("Token is Valid");

      // If valid, proceed to the requested route
      return NextResponse.next();
    } catch (error) {
      console.error("Token validation failed:", error);
      const loginUrl = new URL("/auth", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow access to unprotected routes
  return NextResponse.next();
}
