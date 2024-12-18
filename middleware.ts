import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // List of paths that require authentication
    const protectedPaths = [
      '/properties/create',
      '/properties/edit',
      '/buy',
      '/sell',
      '/rent',
      '/profile',
      '/saved-properties',
      '/my-listings'
    ]

    const isProtectedPath = protectedPaths.some(path => 
      request.nextUrl.pathname.startsWith(path)
    )

    if (isProtectedPath && !user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth'
      url.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  } catch (error) {
    console.error('Error in middleware:', error)
    // Handle the error gracefully, perhaps by redirecting to anerror page or allowing the request to continue:
    // return NextResponse.redirect(new URL('/error', request.url))
    // Or, to allow the request to continue:
    // return NextResponse.next()
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

