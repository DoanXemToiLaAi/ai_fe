import { Suspense } from "react";
import { getRecommendations } from "@/services/api";
import RecommendedProducts from "@/components/recommended-products";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import UserPreferences from "@/components/user-preferences";

interface RecommendationsPageProps {
  params: {
    userId: string;
  };
}

export default function RecommendationsPage({
  params,
}: RecommendationsPageProps) {
  const { userId } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Gợi ý dành cho bạn</h1>

      <Suspense
        fallback={<LoadingState message="Đang tải gợi ý sản phẩm..." />}>
        <RecommendationsWrapper userId={userId} />
      </Suspense>
    </div>
  );
}

async function RecommendationsWrapper({ userId }: { userId: string }) {
  try {
    const data = await getRecommendations(userId);

    return (
      <>
        {data.user_preferences && (
          <UserPreferences preferences={data.user_preferences} />
        )}

        <div className="mt-8">
          <RecommendedProducts products={data.recommended_products} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error loading recommendations:", error);
    return (
      <ErrorState
        title="Không thể tải gợi ý sản phẩm"
        message="Đã xảy ra lỗi khi tải dữ liệu gợi ý sản phẩm. Vui lòng thử lại sau hoặc kiểm tra ID người dùng."
      />
    );
  }
}
