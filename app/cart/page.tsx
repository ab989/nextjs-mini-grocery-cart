"use client"

import { useCart } from "@/context/CartContext"

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalItems } = useCart()

  const totalPrice = cart.reduce((sum, item) => {
    const effectiveQuantity = item.bogof ? Math.ceil(item.quantity / 2) : item.quantity
    return sum + item.price * effectiveQuantity
  }, 0)

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map(item => {
          // calculate effective quantity for BOGOF
          const effectiveQuantity = item.bogof
            ? Math.ceil(item.quantity / 2) // charge for half
            : item.quantity

        return (
          <div
            key={item.code}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
          >
            {/* Image */}
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />

            {/* Info */}
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500">
                Quantity: {item.quantity} {item.bogof && "(BOGOF applied)"}
              </p>
              <p className="text-gray-700 font-medium">
                £{(item.price * effectiveQuantity).toFixed(2)}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.code)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        )
    })}
      </div>

      {/* Total + Clear */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total ({totalItems} items): £{totalPrice.toFixed(2)}</p>
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Clear Cart
        </button>
      </div>
    </div>
  )
}