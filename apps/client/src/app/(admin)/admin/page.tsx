export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Admin dashboard. You&apos;ll implement the features using TDD.
        </p>
      </div>

      {/* Placeholder for dashboard stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['Total Sales', 'Products', 'Customers', 'Orders'].map((stat) => (
          <div key={stat} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm mb-2">{stat}</h3>
            <p className="text-3xl font-bold">-</p>
          </div>
        ))}
      </div>

      {/* Placeholder for recent activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500">No activity yet. Start building your marketplace!</p>
      </div>
    </div>
  )
}
