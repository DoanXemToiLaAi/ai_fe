import { getRecommendations } from "@/services/api";
import ProductList from "@/components/product/product-list";

// Trong thực tế, user_id sẽ được lấy từ session/authentication
const MOCK_USER_ID = "user123";

export default async function RecommendationsPage() {
  const { recommended_products } = await getRecommendations(MOCK_USER_ID);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gợi ý dành riêng cho bạn</h1>

      <ProductList products={recommended_products} />
    </div>
  );
}
