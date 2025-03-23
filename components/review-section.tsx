"use client";

import { useState } from "react";
import type { Review } from "@/types";
import ReviewList from "./review-list";
import ReviewForm from "./review-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, PenSquare } from "lucide-react";

interface ReviewSectionProps {
  reviews: Review[];
  productId: string;
}

export default function ReviewSection({
  reviews,
  productId,
}: ReviewSectionProps) {
  const [activeTab, setActiveTab] = useState("read");
  const [currentReviews, setCurrentReviews] = useState<Review[]>(reviews);

  const handleNewReview = (review: Review) => {
    setCurrentReviews([review, ...currentReviews]);
    setActiveTab("read");
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      <Tabs defaultValue="read" value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b border-gray-800">
          <TabsList className="bg-transparent border-b-0 p-0">
            <TabsTrigger
              value="read"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-6 py-3">
              <MessageSquare className="h-4 w-4 mr-2" />
              Đọc đánh giá ({currentReviews.length})
            </TabsTrigger>
            <TabsTrigger
              value="write"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-6 py-3">
              <PenSquare className="h-4 w-4 mr-2" />
              Viết đánh giá
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="read" className="p-6 mt-0">
          <ReviewList reviews={currentReviews} />
        </TabsContent>

        <TabsContent value="write" className="p-6 mt-0">
          <ReviewForm
            productId={productId}
            onReviewSubmitted={handleNewReview}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
