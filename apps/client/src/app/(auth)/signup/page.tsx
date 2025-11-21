'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormInput } from '@/components/FormInput'

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
]

export default function SignupPage(): React.ReactElement {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    country: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
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
    setSuccessMessage('')

    try {
      const response = await fetch('/api/auth/signup', {
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

      // Success
      setSuccessMessage(data.message || 'Account created successfully!')

      // Redirect to verification page after 2 seconds
      setTimeout(() => {
        router.push('/verify-email-sent')
      }, 2000)
    } catch (error) {
      console.error('Signup error:', error)
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
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Create Account</h1>
          <p className="text-neutral-600">Join our marketplace today</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              id="name"
              name="name"
              type="text"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="John Doe"
              required
              autoComplete="name"
            />

            <FormInput
              id="username"
              name="username"
              type="text"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              placeholder="johndoe"
              required
              autoComplete="username"
            />

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
              autoComplete="new-password"
            />

            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />

            <FormInput
              id="phone"
              name="phone"
              type="tel"
              label="Phone (Optional)"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="+1 (555) 000-0000"
              autoComplete="tel"
            />

            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-neutral-700">
                Country (Optional)
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              >
                <option value="">Select a country</option>
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

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
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
