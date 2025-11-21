'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { SessionData } from '@/types/auth.types'

export interface UserNavProps {
  session: SessionData | null
}

export function UserNav({ session }: UserNavProps): React.ReactElement {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async (): Promise<void> => {
    setIsLoggingOut(true)

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })

      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      setIsLoggingOut(false)
    }
  }

  if (!session) {
    return (
      <div className="flex items-center gap-4">
        <a href="/login" className="text-neutral-700 hover:text-primary-600 transition-colors">
          Log In
        </a>
        <a
          href="/signup"
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all"
        >
          Sign Up
        </a>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
      >
        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
          {session.user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-neutral-700 font-medium">{session.user.name}</span>
        <svg
          className={`w-4 h-4 text-neutral-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-200 z-20">
            <div className="p-4 border-b border-neutral-200">
              <p className="font-medium text-neutral-900">{session.user.name}</p>
              <p className="text-sm text-neutral-500">@{session.user.username}</p>
              <p className="text-sm text-neutral-500">{session.user.email}</p>
            </div>

            <div className="p-2">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoggingOut ? 'Logging out...' : 'Log Out'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
