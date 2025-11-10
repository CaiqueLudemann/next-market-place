export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation - You'll implement this */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          <a href="/admin" className="block px-4 py-2 rounded hover:bg-gray-800">
            Dashboard
          </a>
          <a href="/admin/products" className="block px-4 py-2 rounded hover:bg-gray-800">
            Products
          </a>
          <a href="/admin/users" className="block px-4 py-2 rounded hover:bg-gray-800">
            Users
          </a>
          <a href="/admin/orders" className="block px-4 py-2 rounded hover:bg-gray-800">
            Orders
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">{children}</main>
    </div>
  )
}
