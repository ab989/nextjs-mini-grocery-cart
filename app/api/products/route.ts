import { NextResponse } from 'next/server';
import { Product } from '@/types/product';

export function GET() {
  try {
    const totalProducts: Array<Product> = [
      {
        code: "CA6",
        name: "Cake",
        price: "2.00",
        imageUrl: "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?q=80&w=682&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        code: "A21",
        name: "Kitty Litter",
        price: "18.99",
        imageUrl: "https://media.istockphoto.com/id/182171266/photo/litter-box.jpg?s=1024x1024&w=is&k=20&c=pwTs71MOEToAjTVOK2_2PHHrczsW62g7JE5WG493tUI="
      },
      {
        code: "G95",
        name: "Asparagus",
        price: "0.83",
        imageUrl: "https://images.unsplash.com/photo-1629875235163-2e52306e4018?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        bogof: true
      }
    ]

    return NextResponse.json(totalProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
