import { NavBar } from './components/Navbar'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Shop Header - You'll implement this */}
      <header className="bg-white shadow-sm border-b">
        <NavBar />
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>

      {/* Shop Footer - You'll implement this */}
      <footer className="bg-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">© 2025 Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
