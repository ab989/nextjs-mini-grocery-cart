export interface Product {
  code: string
  name: string
  price: number
  imageUrl?: string
  bogof?: boolean  // buy one get one free
}