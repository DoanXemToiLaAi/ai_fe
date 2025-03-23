import { Suspense } from "react";
import FeaturedProducts from "@/components/featured-products";
import RecommendedProducts from "@/components/recommended-products";
import HeroSection from "@/components/hero-section";
import CategorySection from "@/components/category-section";
import LoadingState from "@/components/loading-state";
import { getHomeData } from "@/services/api";

export default async function Home() {
  return (
    <main>
      <HeroSection />

      <div className="container mx-auto px-4 py-12">
        <Suspense
          fallback={<LoadingState message="Đang tải sản phẩm nổi bật..." />}>
          <FeaturedProductsWrapper />
        </Suspense>

        <CategorySection />

        <Suspense
          fallback={<LoadingState message="Đang tải sản phẩm gợi ý..." />}>
          <RecommendedProductsWrapper />
        </Suspense>
      </div>
    </main>
  );
}

// Wrapper components để sử dụng async/await
async function FeaturedProductsWrapper() {
  try {
    const data = await getHomeData();
    return <FeaturedProducts products={data.featured_products} />;
  } catch (error) {
    console.error("Error loading featured products:", error);
    return (
      <div className="bg-red-900/20 border border-red-900/30 rounded-lg p-4 my-8">
        <h2 className="text-xl font-bold text-red-500 mb-2">
          Không thể tải sản phẩm nổi bật
        </h2>
        <p className="text-gray-300">
          Đã xảy ra lỗi khi tải dữ liệu sản phẩm nổi bật. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }
}

async function RecommendedProductsWrapper() {
  try {
    const data = await getHomeData();
    return <RecommendedProducts products={data.recommended_products} />;
  } catch (error) {
    console.error("Error loading recommended products:", error);
    return (
      <div className="bg-red-900/20 border border-red-900/30 rounded-lg p-4 my-8">
        <h2 className="text-xl font-bold text-red-500 mb-2">
          Không thể tải sản phẩm gợi ý
        </h2>
        <p className="text-gray-300">
          Đã xảy ra lỗi khi tải dữ liệu sản phẩm gợi ý. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }
}
