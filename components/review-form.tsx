"use client";

import type React from "react";
import type { Review } from "@/types";
import { useState } from "react";
import { analyzeReview } from "@/services/api";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted?: (review: Review) => void;
}

export default function ReviewForm({
  productId,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Vui lòng chọn số sao đánh giá");
      return;
    }

    if (!review.trim()) {
      setError("Vui lòng nhập nội dung đánh giá");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Gọi API phân tích cảm xúc
      const result = await analyzeReview(review);
      setSentiment(result.sentiment);

      // Tạo đối tượng review mới
      const newReview: Review = {
        user: "Người dùng", // Thông thường sẽ lấy từ thông tin đăng nhập
        review: review,
        sentiment: result.sentiment as "positive" | "negative" | "neutral",
        date: new Date().toISOString(),
        rating: rating,
      };

      // Gọi callback nếu có
      if (onReviewSubmitted) {
        onReviewSubmitted(newReview);
      }

      // Giả lập gửi đánh giá thành công
      setTimeout(() => {
        setSuccess(true);
        setReview("");
        setRating(0);
      }, 1000);
    } catch (err) {
      setError("Không thể phân tích đánh giá. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 bg-green-900/20 border border-green-900/30 rounded-lg text-center">
        <h3 className="text-xl font-medium text-green-500 mb-2">
          Cảm ơn bạn đã đánh giá!
        </h3>
        <p className="text-gray-300 mb-4">
          Đánh giá của bạn đã được ghi nhận và sẽ được hiển thị sau khi xét
          duyệt.
        </p>
        <Button
          variant="outline"
          className="border-green-900/30 hover:bg-green-900/20 text-green-500"
          onClick={() => {
            setSuccess(false);
            setSentiment(null);
          }}>
          Viết đánh giá khác
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Đánh giá của bạn
        </label>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1">
              <Star
                className={`h-8 w-8 ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-600"
                } transition-colors`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-400">
            {rating > 0 ? `${rating} sao` : "Chọn đánh giá"}
          </span>
        </div>
      </div>

      <div>
        <label
          htmlFor="review"
          className="block text-sm font-medium text-gray-300 mb-2">
          Nội dung đánh giá
        </label>
        <textarea
          id="review"
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-white"
          placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
          disabled={isSubmitting}
        />
      </div>

      {error && (
        <div className="p-3 bg-red-900/20 border border-red-900/30 text-red-500 rounded-md">
          {error}
        </div>
      )}

      {sentiment && (
        <div
          className={`p-3 rounded-md border ${
            sentiment === "positive"
              ? "bg-green-900/20 border-green-900/30 text-green-500"
              : sentiment === "negative"
              ? "bg-red-900/20 border-red-900/30 text-red-500"
              : "bg-gray-800 border-gray-700 text-gray-300"
          }`}>
          Đánh giá của bạn được phát hiện là{" "}
          <strong>
            {sentiment === "positive"
              ? "tích cực"
              : sentiment === "negative"
              ? "tiêu cực"
              : "trung lập"}
          </strong>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary/90">
        {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
      </Button>
    </form>
  );
}
