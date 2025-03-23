"use client"

import type { Review } from "@/types"
import { Star, ThumbsUp } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

interface ReviewListProps {
  reviews: Review[]
}

export default function ReviewList({ reviews }: ReviewListProps) {
  const [helpfulReviews, setHelpfulReviews] = useState<Record<number, boolean>>({})

  const markHelpful = (index: number) => {
    setHelpfulReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!
        </p>
      ) : (
        reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                  {review.user.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{review.user}</h3>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-xs text-gray-500">1 tháng trước</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  review.sentiment === "positive"
                    ? "bg-green-100 text-green-800"
                    : review.sentiment === "negative"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {review.sentiment === "positive"
                  ? "Tích cực"
                  : review.sentiment === "negative"
                    ? "Tiêu cực"
                    : "Trung lập"}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{review.review}</p>
            <div className="flex items-center justify-end">
              <button
                onClick={() => markHelpful(index)}
                className={`flex items-center text-sm ${
                  helpfulReviews[index] ? "text-blue-600" : "text-gray-500"
                } hover:text-blue-600`}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                {helpfulReviews[index] ? "Hữu ích (1)" : "Đánh giá hữu ích?"}
              </button>
            </div>
          </motion.div>
        ))
      )}
    </div>
  )
}

