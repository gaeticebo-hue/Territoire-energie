import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import type { Database } from "@/lib/supabase/types"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isMembersArea = pathname.startsWith("/espace-membres")
  const isLoginPage = pathname === "/espace-membres/connexion"
  const isAuthCallback = pathname.startsWith("/auth/callback")

  if (isMembersArea && !isLoginPage && !isAuthCallback && !user) {
    const redirectUrl = new URL("/espace-membres/connexion", request.url)
    redirectUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (isLoginPage && user) {
    return NextResponse.redirect(new URL("/espace-membres", request.url))
  }

  return response
}

export const config = {
  matcher: ["/espace-membres/:path*", "/auth/callback"],
}
