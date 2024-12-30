import { NextResponse } from 'next/server'
import { auth } from '@/utils/firebase/admin'

export async function POST(request: Request) {
  const { idToken } = await request.json()

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('session', sessionCookie, options)
    return response
  } catch (error) {
    console.error('Error creating session cookie:', error)
    return NextResponse.json({ success: false, error: 'Failed to create session cookie' }, { status: 500 })
  }
}

