import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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
  const jwtCookie = cookies().get("jwt");
  const token = jwtCookie?.value;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname;

  // rewrites for app pages
  if (hostname == `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    // Allow access to /login and /register if unauthenticated
    if (!token && path !== "/login" && path !== "/register") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (token && (path === "/login" || path === "/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If authenticated or visiting /register or /login, proceed as normal
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url)
    );
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url)
    );
  }

  // rewrite everything else to `/[domain]/[path]` dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
