import { Suspense } from "react";
import { getProductData } from "@/services/api";
import ProductDetails from "@/components/product-details";
import RelatedProducts from "@/components/related-products";
import ReviewSection from "@/components/review-section";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense
        fallback={<LoadingState message="Đang tải thông tin sản phẩm..." />}>
        <ProductDetailsWrapper id={id} />
      </Suspense>
    </div>
  );
}

async function ProductDetailsWrapper({ id }: { id: string }) {
  try {
    const data = await getProductData(id);

    return (
      <>
        <ProductDetails product={data.product} />

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Đánh giá sản phẩm
          </h2>
          <ReviewSection reviews={data.reviews} productId={id} />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Sản phẩm liên quan
          </h2>
          <RelatedProducts products={data.related_products} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error loading product data:", error);
    return (
      <ErrorState
        title="Không thể tải thông tin sản phẩm"
        message="Đã xảy ra lỗi khi tải dữ liệu sản phẩm. Vui lòng thử lại sau hoặc kiểm tra ID sản phẩm."
      />
    );
  }
}
