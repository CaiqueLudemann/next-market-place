import Link from 'next/link'

export function NavBar() {
  return (
    <nav className="flex justify-between mx-auto px-10 py-4">
      <h1 className="text-2xl font-bold">Marketplace</h1>
      <ul className="flex w-2xl justify-around">
        <li>
          <Link href="/shop">Shop</Link>
        </li>
        <li>
          <Link href="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  )
}
