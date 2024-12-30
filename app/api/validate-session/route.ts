// File: /app/api/validate-session/route.js
import { NextResponse } from 'next/server';
import { auth } from '@/utils/firebase/admin';

// Utility function to parse cookies
function parseCookies(cookies: string): Record<string, string> {
    return cookies.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
  }
  
  // Updated API handler
  export async function GET(request: Request) {
    const cookies = request.headers.get('cookie') || '';
    const parsedCookies = parseCookies(cookies);
    const session = parsedCookies['session'];
  
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  
    try {
      const decodedClaims = await auth.verifySessionCookie(session, true);
      if (decodedClaims) {
        return NextResponse.json({ authenticated: true }, { status: 200 });
      }
    } catch (error) {
      console.error('Error verifying session cookie:', error);
    }
  
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  