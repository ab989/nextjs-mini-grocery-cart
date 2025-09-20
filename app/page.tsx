'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Home page
    </div>
  );
}
