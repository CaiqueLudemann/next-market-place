import Link from 'next/link'

export function NavBar() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-neutral-200/50 animate-slide-down">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/shop" className="group flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-accent transition-shadow duration-300"
              style={{
                background: 'linear-gradient(to bottom right, rgb(79 70 229), rgb(6 182 212))',
              }}
            >
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1
              className="text-2xl font-bold font-display"
              style={{
                background: 'linear-gradient(to right, rgb(79 70 229), rgb(6 182 212))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Marketplace
            </h1>
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center gap-8">
            <li>
              <Link
                href="/shop"
                className="text-neutral-700 hover:text-primary-600 font-medium px-4 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link href="/cart" className="relative group">
                <div
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium shadow-soft hover:shadow-medium transition-all duration-200"
                  style={{
                    background: 'linear-gradient(to right, rgb(79 70 229), rgb(67 56 202))',
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span>Cart</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
