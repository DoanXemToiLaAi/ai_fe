import { getHomeData } from "@/services/api";
import ProductList from "@/components/product-list";
import { notFound } from "next/navigation";

const validCategories = ["shoes", "bags", "watches", "phones", "laptops"];

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  if (!validCategories.includes(params.category.toLowerCase())) {
    notFound();
  }

  const data = await getHomeData();

  const categoryProducts = [
    ...data.featured_products,
    ...data.recommended_products,
  ].filter(
    (product) =>
      product.category.toLowerCase() === params.category.toLowerCase()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 capitalize">
          {params.category}
        </h1>
        <p className="text-gray-600">
          Khám phá bộ sưu tập {params.category.toLowerCase()} chất lượng cao của
          chúng tôi
        </p>
      </div>

      {categoryProducts.length > 0 ? (
        <ProductList products={categoryProducts} />
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">
            Không tìm thấy sản phẩm nào trong danh mục này.
          </p>
        </div>
      )}
    </div>
  );
}
