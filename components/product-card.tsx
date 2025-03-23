"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Xử lý giá hiển thị
  const displayPrice = product.discount_price || product.price;
  const hasDiscount =
    product.discount_price && product.discount_price < product.price;

  // Tính phần trăm giảm giá nếu có
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - (product.discount_price || 0)) / product.price) * 100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-gray-900 rounded-xl border border-gray-800 overflow-hidden transition-all duration-300 hover:border-gray-700 hover:shadow-lg hover:shadow-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Link href={`/product/${product._id}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={product.image_url || "/placeholder.svg?height=256&width=256"}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <span className="inline-block bg-primary/90 text-white text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>

            {hasDiscount && (
              <span className="inline-block bg-red-500/90 text-white text-xs px-2 py-1 rounded-full">
                -{discountPercentage}%
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product._id}`}>
          <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < (product.rating || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-400">
              ({product.rating || 4.5})
            </span>
          </div>
          <div className="flex flex-col items-end">
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
            <span className="font-medium text-primary">
              {formatCurrency(displayPrice)}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex justify-between items-center">
          <button
            className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
            aria-label="Thêm vào giỏ hàng">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button
            className={`p-2 rounded-full ${
              isFavorite
                ? "bg-red-900/50 text-red-400"
                : "bg-gray-800 text-gray-400"
            } hover:bg-gray-700 transition-colors`}
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            aria-label={
              isFavorite ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"
            }>
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
