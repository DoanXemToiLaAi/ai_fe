"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { useState } from "react";
import {
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
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

  // Mock data for product images
  const productImages = [
    product.image_url || "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
  ];

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < (product.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-96 md:h-[500px] rounded-xl overflow-hidden border border-gray-800 shadow-lg shadow-black/50">
          <Image
            src={productImages[activeImage] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </motion.div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`relative h-20 rounded-md overflow-hidden border ${
                activeImage === index
                  ? "border-primary"
                  : "border-gray-800 opacity-70"
              }`}>
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} - Ảnh ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center mb-2">
          <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
            {product.category}
          </span>
          <div className="ml-auto flex items-center">
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
            <span className="ml-1 text-sm text-gray-400">
              ({product.rating || 4.5})
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>

        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-primary">
              {formatCurrency(displayPrice)}
            </span>
            {hasDiscount && (
              <>
                <span className="ml-2 text-lg text-gray-500 line-through">
                  {formatCurrency(product.price)}
                </span>
                <span className="ml-2 px-2 py-1 bg-red-900/30 text-red-400 text-sm rounded">
                  -{discountPercentage}%
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">Giá đã bao gồm thuế VAT</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2 text-white">Mô tả</h2>
          <p className="text-gray-400">
            {product.description ||
              "Sản phẩm chất lượng cao với thiết kế hiện đại và công nghệ tiên tiến. Phù hợp cho mọi nhu cầu sử dụng hàng ngày."}
          </p>
        </div>

        {product.specifications &&
          Object.keys(product.specifications).length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2 text-white">
                Thông số kỹ thuật
              </h2>
              <div className="bg-gray-800 rounded-lg p-4">
                <ul className="space-y-2">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span className="text-gray-400 capitalize">
                          {key.replace("_", " ")}
                        </span>
                        <span className="text-white font-medium">
                          {Array.isArray(value)
                            ? value.join(", ")
                            : value.toString()}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2 text-white">Số lượng</h2>
          <div className="flex items-center">
            <button
              onClick={decreaseQuantity}
              className="w-10 h-10 rounded-l-md border border-gray-700 bg-gray-800 flex items-center justify-center hover:bg-gray-700 text-white">
              -
            </button>
            <input
              type="number"
              min="1"
              max={product.stock || 10}
              value={quantity}
              onChange={(e) =>
                setQuantity(Number.parseInt(e.target.value) || 1)
              }
              className="w-16 h-10 border-t border-b border-gray-700 bg-gray-800 text-center text-white"
              style={{ color: "white", WebkitTextFillColor: "white" }}
            />
            <button
              onClick={increaseQuantity}
              className="w-10 h-10 rounded-r-md border border-gray-700 bg-gray-800 flex items-center justify-center hover:bg-gray-700 text-white">
              +
            </button>
            <span className="ml-3 text-sm text-gray-400">
              {product.stock ? `Còn ${product.stock} sản phẩm` : "Còn hàng"}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button className="flex-1 bg-primary hover:bg-primary/90">
            <ShoppingCart className="mr-2 h-5 w-5" /> Thêm vào giỏ hàng
          </Button>
          <Button
            variant="outline"
            className={`flex-1 border-gray-700 ${
              isFavorite
                ? "bg-red-900/20 text-red-400 border-red-900/50"
                : "text-gray-300"
            }`}
            onClick={() => setIsFavorite(!isFavorite)}>
            <Heart
              className={`mr-2 h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`}
            />
            {isFavorite ? "Đã yêu thích" : "Thêm vào yêu thích"}
          </Button>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start">
              <Truck className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-white">
                  Giao hàng miễn phí
                </h3>
                <p className="text-xs text-gray-400">
                  Cho đơn hàng trên 500.000₫
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-white">
                  Bảo hành 12 tháng
                </h3>
                <p className="text-xs text-gray-400">Đổi trả dễ dàng</p>
              </div>
            </div>
            <div className="flex items-start">
              <RotateCcw className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-white">
                  Đổi trả trong 30 ngày
                </h3>
                <p className="text-xs text-gray-400">Nếu không hài lòng</p>
              </div>
            </div>
            <div className="flex items-start">
              <Share2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-white">
                  Chia sẻ sản phẩm
                </h3>
                <p className="text-xs text-gray-400">Qua mạng xã hội</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
