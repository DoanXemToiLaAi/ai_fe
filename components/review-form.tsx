"use client"

import type React from "react"

import { useState } from "react"
import { analyzeReview } from "@/services/api"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReviewFormProps {
  productId: string
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sentiment, setSentiment] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      setError("Vui lòng chọn số sao đánh giá")
      return
    }

    if (!review.trim()) {
      setError("Vui lòng nhập nội dung đánh giá")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      // Gọi API phân tích cảm xúc
      const result = await analyzeReview(review)
      setSentiment(result.sentiment)

      // Giả lập gửi đánh giá thành công
      setTimeout(() => {
        setSuccess(true)
        setReview("")
        setRating(0)
      }, 1000)
    } catch (err) {
      setError("Không thể phân tích đánh giá. Vui lòng thử lại.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="p-6 bg-green-50 rounded-lg text-center">
        <h3 className="text-xl font-medium text-green-800 mb-2">Cảm ơn bạn đã đánh giá!</h3>
        <p className="text-green-600 mb-4">Đánh giá của bạn đã được ghi nhận và sẽ được hiển thị sau khi xét duyệt.</p>
        <Button
          variant="outline"
          className="text-green-600 border-green-200 hover:bg-green-100"
          onClick={() => setSuccess(false)}
        >
          Viết đánh giá khác
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá của bạn</label>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1"
            >
              <Star
                className={`h-8 w-8 ${
                  (hoverRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                } transition-colors`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-500">{rating > 0 ? `${rating} sao` : "Chọn đánh giá"}</span>
        </div>
      </div>

      <div>
        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
          Nội dung đánh giá
        </label>
        <textarea
          id="review"
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
          disabled={isSubmitting}
        />
      </div>

      {error && <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

      {sentiment && (
        <div
          className={`p-3 rounded-md ${
            sentiment === "positive"
              ? "bg-green-100 text-green-800"
              : sentiment === "negative"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          Đánh giá của bạn được phát hiện là{" "}
          <strong>{sentiment === "positive" ? "tích cực" : sentiment === "negative" ? "tiêu cực" : "trung lập"}</strong>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700">
        {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
      </Button>
    </form>
  )
}

