import { Product } from "@/types/product"
import { useCart } from "@/context/CartContext"

const ProductCard = ({ product }: { product: Product}) => {
  const { addToCart } = useCart()

  return (
    <div className="max-w-sm rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          {product.bogof && <img src="/bogof.png" className="h-7" /> }
        </div>

        {/* Price + Button */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">
            £{product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard