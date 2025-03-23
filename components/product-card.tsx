"use client"

import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/types"
import { Heart, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-gray-900 rounded-xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-gray-700 hover:shadow-lg hover:shadow-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product._id}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={product.image_url || "/placeholder.svg?height=256&width=256"}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product._id}`}>
          <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-400">(4.5)</span>
          </div>
          <span className="font-medium text-primary">2.500.000₫</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex justify-between items-center">
          <button
            className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
            aria-label="Thêm vào giỏ hàng"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button
            className={`p-2 rounded-full ${isFavorite ? "bg-red-900/50 text-red-400" : "bg-gray-800 text-gray-400"} hover:bg-gray-700 transition-colors`}
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
            aria-label={isFavorite ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

