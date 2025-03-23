"use client"

import { useState, useEffect } from "react"
import { getProductData } from "@/services/api"
import ProductDetails from "@/components/product-details"
import ReviewList from "@/components/review-list"
import ReviewForm from "@/components/review-form"
import { Breadcrumb } from "@/components/breadcrumb"
import RelatedProducts from "@/components/related-products"
import LoadingState from "@/components/loading-state"
import ErrorState from "@/components/error-state"
import type { ProductData } from "@/types"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<ProductData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const productData = await getProductData(params.id)
      setData(productData)
    } catch (err) {
      setError("Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [params.id])

  if (isLoading) {
    return <LoadingState size="large" message="Đang tải thông tin sản phẩm..." />
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchData} />
  }

  if (!data) {
    return <ErrorState message="Không có dữ liệu sản phẩm để hiển thị" onRetry={fetchData} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Sản phẩm", href: "/categories" },
          { label: data.product.category, href: `/categories/${data.product.category}` },
          { label: data.product.name, href: `/product/${params.id}`, active: true },
        ]}
      />

      <div className="mt-6">
        <ProductDetails product={data.product} />
      </div>

      <div className="mt-16 bg-gray-50 -mx-4 px-4 py-12 rounded-lg">
        <h2 className="text-2xl font-bold mb-8 text-center">Đánh giá từ khách hàng</h2>
        <div className="max-w-4xl mx-auto">
          <ReviewList reviews={data.reviews} />
          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-4">Viết đánh giá của bạn</h3>
            <ReviewForm productId={params.id} />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Sản phẩm liên quan</h2>
        <RelatedProducts products={data.related_products} />
      </div>
    </div>
  )
}

