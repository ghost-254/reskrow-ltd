import { NextResponse } from 'next/server'
import { auth } from '@/utils/firebase/config'
import { applyActionCode } from 'firebase/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const oobCode = searchParams.get('oobCode')

  if (oobCode) {
    try {
      await applyActionCode(auth, oobCode)
      return NextResponse.redirect('/auth/verification-success')
    } catch (error) {
      console.error('Error verifying email:', error)
      return NextResponse.redirect('/auth?error=Email verification failed')
    }
  }

  return NextResponse.redirect('/')
}

