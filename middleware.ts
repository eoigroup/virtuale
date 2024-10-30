import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { DecodedJWT } from "./types/user";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const jwtCookie = req.cookies.get("jwt");
  const token = jwtCookie?.value;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  // Check for JWT token and expiration
  if (token) {
    const decoded = jwtDecode<DecodedJWT>(token);
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.set("jwt", "", { maxAge: -1, path: "/" });
      return response;
    }
  }

  // Handle logic for the root domain (e.g., landing page and app routing)
  if (hostname === `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    // If no token and the user is on "/", serve the landing page
    if (!token && path === "/") {
      return NextResponse.rewrite(new URL("/home", req.url));
    }

    // Allow access to /login and /register if unauthenticated
    if (
      !token &&
      path !== "/login" &&
      path !== "/register" &&
      path !== "/login/social" && 
      path !== "/company" && // Allow access to /company
      path !== "/safety" && // Allow access to /suggest
      path !== "/suggest" && // Allow access to /suggest
      path !== "/partnerships" && // Allow access to /partnerships
      path !== "/tos" && // Allow access to /tos
      path !== "/privacy" && // Allow access to /privacy
      path !== "/news" && // Allow access to /news
      path !== "/faq" // Allow access to /faq
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (token && (path === "/login" || path === "/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If authenticated or visiting /register or /login, proceed as normal
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url)
    );
  }

  // Rewrite everything else to `/[domain]/[path]` dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
