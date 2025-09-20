'use client'

import Link from "next/link"
import { ShoppingCart } from "lucide-react" // lightweight icon library
import { useCart } from "@/context/CartContext"

const NavHeader = () => {
  const { totalItems } = useCart()

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo / Brand */}
      <Link href="/" className="relative">
        <h1 className="text-2xl font-bold text-indigo-600">MyShop</h1>
      </Link>

      {/* Cart Icon */}
      <Link href="/cart" className="relative">
        <ShoppingCart className="w-7 h-7 text-gray-700 hover:text-indigo-600 cursor-pointer" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </Link>
    </header>
  )
}

export default NavHeader