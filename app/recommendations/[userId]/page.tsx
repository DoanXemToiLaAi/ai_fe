import { getRecommendations } from "@/services/api";
import ProductList from "@/components/product-list";
import { Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";

export default async function RecommendationsPage({
  params,
}: {
  params: { userId: string };
}) {
  const data = await getRecommendations(params.userId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Gợi ý cá nhân hóa cho bạn
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Dựa trên lịch sử mua sắm và sở thích của bạn, AI của chúng tôi đã
            chọn ra những sản phẩm phù hợp nhất.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-12 text-white">
          <div className="flex items-center">
            <Sparkles className="h-8 w-8 mr-3" />
            <div>
              <h2 className="text-xl font-bold">Công nghệ AI gợi ý</h2>
              <p>
                Hệ thống của chúng tôi học từ sở thích của bạn để đề xuất những
                sản phẩm phù hợp nhất.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Sản phẩm gợi ý</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                Gợi ý có hữu ích không?
              </span>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 transition-colors">
                <ThumbsUp className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors">
                <ThumbsDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          <ProductList products={data.recommended_products} />
        </div>

        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Tại sao bạn nhận được những gợi ý này?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">Lịch sử mua sắm</h3>
              <p className="text-gray-600">
                Dựa trên các sản phẩm bạn đã xem và mua trước đây
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">Sở thích cá nhân</h3>
              <p className="text-gray-600">
                Phân tích các danh mục và thương hiệu bạn quan tâm
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">Xu hướng thị trường</h3>
              <p className="text-gray-600">
                Kết hợp với các sản phẩm đang được ưa chuộng
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
