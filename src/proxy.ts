import { NextRequest, NextResponse } from "next/server"
import { userService } from "./services/user.service"
import { Roles } from "./constant/roles"

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const { data } = await userService.getSession()

  //  Not authenticated
  if (!data?.user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const role = data.user.role

  //  Admin rules
  if (role === Roles.admin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url))
  }

  //  Provider rules
  if (role === Roles.provider && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(
      new URL("/provider-dashboard", request.url)
    )
  }

  //  Customer rules
  if (
    role === Roles.customer &&
    (pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/provider-dashboard"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  //  Block cross-access for admin/provider
  if (
    role !== Roles.admin &&
    pathname.startsWith("/admin-dashboard")
  ) {
    return NextResponse.redirect(
      new URL(
        role === Roles.provider
          ? "/provider-dashboard"
          : "/dashboard",
        request.url
      )
    )
  }

  if (
    role !== Roles.provider &&
    pathname.startsWith("/provider-dashboard")
  ) {
    return NextResponse.redirect(
      new URL(
        role === Roles.admin
          ? "/admin-dashboard"
          : "/dashboard",
        request.url
      )
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/provider-dashboard/:path*",
    "/admin-dashboard/:path*",
  ],
}
