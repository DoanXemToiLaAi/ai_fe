"use client";

import { useState, useEffect } from "react";
import { getHomeData } from "@/services/api";
import Link from "next/link";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import FeaturedProducts from "@/components/featured-products";
import ProductCard from "@/components/product-card";
import type { HomeData } from "@/types";
import { motion } from "framer-motion";

export default function Home() {
  const [data, setData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const homeData = await getHomeData();
      setData(homeData);
    } catch (err) {
      setError("Không thể tải dữ liệu trang chủ. Vui lòng thử lại sau.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <LoadingState size="large" message="Đang tải dữ liệu trang chủ..." />
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchData} />;
  }

  if (!data) {
    return (
      <ErrorState message="Không có dữ liệu để hiển thị" onRetry={fetchData} />
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          AI-Powered E-commerce
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Khám phá trải nghiệm mua sắm được cá nhân hóa với công nghệ AI tiên
          tiến
        </p>
      </motion.div>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-white">
            Sản phẩm nổi bật
          </h2>
          <Link
            href="/featured"
            className="text-primary hover:text-primary/80 transition-colors text-sm">
            Xem tất cả
          </Link>
        </div>
        <FeaturedProducts products={data.featured_products} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-white">Gợi ý cho bạn</h2>
          <Link
            href="/recommendations/user123"
            className="text-primary hover:text-primary/80 transition-colors text-sm">
            Xem tất cả
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.recommended_products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
