'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'

import ProductCard from './components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState<Array<Product>>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product)
  }

  return (
    <main className="p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.map((product) => (
        <ProductCard product={product} onAddToCart={handleAddToCart} key={product.code} />
      ))}
    </main>
  )
}
