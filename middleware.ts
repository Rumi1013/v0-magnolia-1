import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // This is a simplified example for demo purposes
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    // Check if the admin is authenticated
    const isAuthenticated = request.cookies.has("adminAuthenticated")

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
}
