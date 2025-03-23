"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types";
import ProductCard from "./product-card";
import { Sparkles } from "lucide-react";
import Link from "next/link";

interface RecommendedProductsProps {
  products: Product[];
  showViewAll?: boolean;
}

export default function RecommendedProducts({
  products,
  showViewAll = true,
}: RecommendedProductsProps) {
  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-2xl font-bold text-white">Gợi ý cho bạn</h2>
        </div>

        {showViewAll && (
          <Link
            href="/recommendations/user1"
            className="text-primary hover:text-primary/80 transition-colors text-sm">
            Xem tất cả
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
