import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Refresh session if expired - required for Server Components
  // and Route Handlers
  await supabase.auth.getSession()

  // Protect dashboard routes
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data: profile } = user
    ? await supabase.from("profiles").select("role").eq("id", user.id).single()
    : { data: null }

  const path = request.nextUrl.pathname

  // Redirect authenticated users from login/register pages to their dashboard
  if (user && (path.startsWith("/login") || path.startsWith("/registrieren") || path === "/")) {
    if (profile?.role) {
      return NextResponse.redirect(new URL(`/dashboard/${profile.role}`, request.url))
    }
    return NextResponse.redirect(new URL("/dashboard/kunde", request.url)) // Default if role not found
  }

  // Protect dashboard routes: only authenticated users can access
  if (path.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    // Optional: Further restrict access based on role if needed
    // e.g., if (path.startsWith('/dashboard/amt') && profile?.role !== 'amt') { ... }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - any files in the /public folder (which includes /placeholder.svg)
     * - auth/callback (Supabase auth callbacks)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|auth/callback).*)",
  ],
}
