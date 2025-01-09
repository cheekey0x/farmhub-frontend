import { NextRequest, NextResponse } from "next/server";
import { ENDPOINTS } from "./constant/router";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const session = await getToken({ req: request, secret: process.env.SECRET });

  const { pathname } = request.nextUrl;
  const isProtectedRoute = ENDPOINTS.protectedRoutes.url.includes(pathname);
  const isLoginRoute = pathname === "/login";

  if (
    !(
      pathname.includes("/static") ||
      pathname.includes("/assets") ||
      pathname.includes("/favicon") ||
      pathname.includes("/font") ||
      pathname.includes("/api")
    )
  ) {
    console.log({
      protectedRoute: !session && isProtectedRoute,
      loginRoute: !!(session && isLoginRoute),
      route: pathname
    });
  }

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (session && isLoginRoute) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  if (!session && isLoginRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (session && pathname === "/undefined") {
    console.log("redirect to app, undefined");
    return NextResponse.redirect(new URL("/app", request.url));
  }

  return NextResponse.next();
}
