'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { FormInput } from '@/components/FormInput'

function LoginContent(): React.ReactElement {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/shop'

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          const errorMap: Record<string, string> = {}
          data.errors.forEach((err: { field: string; message: string }) => {
            errorMap[err.field] = err.message
          })
          setErrors(errorMap)
        } else {
          setErrors({ general: data.error || 'An error occurred' })
        }
        return
      }

      // Success - redirect to intended page
      router.push(redirect)
      router.refresh()
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ general: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Welcome Back</h1>
          <p className="text-neutral-600">Log in to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="john@example.com"
              required
              autoComplete="email"
            />

            <FormInput
              id="password"
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full px-6 py-3 rounded-lg font-medium transition-all
                ${
                  isLoading
                    ? 'bg-neutral-300 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 active:scale-95'
                }
                text-white shadow-lg
              `}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="text-center">
              <p className="text-sm text-neutral-600">
                Don&apos;t have an account?{' '}
                <Link
                  href="/signup"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage(): React.ReactElement {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  )
}
