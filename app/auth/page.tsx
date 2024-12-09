import { Suspense } from 'react'
import { AuthForm } from '@/components/AuthForm'
import { LoadingSpinner } from "@/components/LoadingSpinner"

export default function AuthPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
      <Suspense fallback={<LoadingSpinner size={48} />}>
        <AuthForm />
      </Suspense>
    </div>
  )
}

