"use client"

import { useCart } from "@/context/CartContext"
import { ThresholdDiscount } from "@/types/thresholdDiscount"
import { useEffect, useState } from "react"

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalItems } = useCart()

  const [thresholdDiscount, setThresholdDiscount] = useState<ThresholdDiscount>({threshold: 0, discountRate: 0})

  useEffect(() => {
    const fetchDiscount = async () => {
      const res = await fetch('/api/discount')
      const data = await res.json()
      setThresholdDiscount(data)
    }

    fetchDiscount()
  }, [])

  // base price before discounts
  const subTotal = cart.reduce((sum, item) => {
    const effectiveQuantity = item.bogof ? Math.ceil(item.quantity / 2) : item.quantity
    return sum + item.price * effectiveQuantity
  }, 0)

  // check if discount applies
  const discount =
    subTotal > thresholdDiscount.threshold
      ? subTotal * thresholdDiscount.discountRate
      : 0

  const totalPrice = subTotal - discount

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

      {/* Totals */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow space-y-2">
        {discount > 0 && (
          <>
            <p className="text-lg font-medium">Subtotal: £{subTotal.toFixed(2)}</p>
            <p className="text-green-600 font-semibold">
                Discount ({thresholdDiscount.discountRate * 100}% off over £{thresholdDiscount.threshold}): -£{discount.toFixed(2)}
            </p>
          </>
        )}
        <p className="text-xl font-bold">Total: £{totalPrice.toFixed(2)}</p>
      </div>

      {/* Clear Cart */}
      <div className="mt-4 flex justify-end">
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