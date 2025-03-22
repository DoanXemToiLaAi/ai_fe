"use client"

import type { Product } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  // Display only the first 3 featured products
  const featuredProducts = products.slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredProducts.map((product, index) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link href={`/product/${product._id}`}>
            <div className="group relative h-96 overflow-hidden rounded-xl shadow-md">
              <Image
                src={product.image_url || "/placeholder.svg?height=384&width=384"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="mb-2">
                    <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-200 mb-4 line-clamp-2">
                    {product.description || "Khám phá sản phẩm tuyệt vời này ngay hôm nay."}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">2.500.000₫</span>
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-lg group-hover:bg-blue-600 transition-colors">
                      Xem chi tiết
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

