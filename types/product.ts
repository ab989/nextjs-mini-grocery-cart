export interface Product {
  code: string
  name: string
  price: string
  imageUrl?: string
  currency?: string
  bogof?: boolean  // buy one get one free
}