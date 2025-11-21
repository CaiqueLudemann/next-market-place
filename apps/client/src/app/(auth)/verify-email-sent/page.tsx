import Link from 'next/link'

export default function VerifyEmailSentPage(): React.ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-neutral-900">Check Your Email</h1>
            <p className="text-neutral-600">
              We&apos;ve sent a verification link to your email address. Please click the link to
              verify your account.
            </p>
            <p className="text-sm text-neutral-500">
              Didn&apos;t receive the email? Check your spam folder or contact support.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-4">
            <Link
              href="/login"
              className="inline-block w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
