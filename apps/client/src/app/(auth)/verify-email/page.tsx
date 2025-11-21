'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function VerifyEmailContent(): React.ReactElement {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setStatus('error')
      setMessage('Invalid verification link')
      return
    }

    const verifyEmail = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/auth/verify?token=${encodeURIComponent(token)}`)
        const data = await response.json()

        if (response.ok) {
          setStatus('success')
          setMessage(data.message || 'Email verified successfully!')

          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/login')
          }, 3000)
        } else {
          setStatus('error')
          setMessage(data.error || 'Verification failed')
        }
      } catch (error) {
        console.error('Verification error:', error)
        setStatus('error')
        setMessage('An unexpected error occurred')
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          {status === 'loading' && (
            <>
              <div className="mx-auto w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
              <h1 className="text-2xl font-bold text-neutral-900">Verifying Email...</h1>
              <p className="text-neutral-600">Please wait while we verify your email address.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-neutral-900">Email Verified!</h1>
              <p className="text-neutral-600">{message}</p>
              <p className="text-sm text-neutral-500">Redirecting to login...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-neutral-900">Verification Failed</h1>
              <p className="text-neutral-600">{message}</p>
              <Link
                href="/signup"
                className="inline-block w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all"
              >
                Try Again
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage(): React.ReactElement {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
