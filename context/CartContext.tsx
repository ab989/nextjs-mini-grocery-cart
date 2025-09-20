"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react"
import toast from "react-hot-toast"

import { CartItem } from "@/types/cartItem"
import { Product } from "@/types/product"

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productCode: string) => void
  clearCart: () => void
  totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load initial cart from localStorage (safe inside useEffect)
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      setCart(JSON.parse(stored))
    }
  }, [])

  // Persist cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])
  
  // Add item
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.code === product.code)
      if (existing) {
        return prev.map(item =>
          item.code === product.code ? { ...item, quantity: item.quantity + 1 } : item
        )
      }      
      return [...prev, { ...product, quantity: 1 }]
    })
    toast.success(`${product.name} added to cart!`)
  }

  // Remove item
  const removeFromCart = (productCode: string) => {
    setCart(prev => prev.filter(item => item.code !== productCode))
    toast.success("Item removed from cart")
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
    toast.success("Cart cleared")
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
