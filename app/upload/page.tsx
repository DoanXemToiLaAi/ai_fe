"use client";

import { useState } from "react";
import { classifyProduct } from "@/services/api";
import ImageUploader from "@/components/image-uploader";
import { motion } from "framer-motion";
import { Sparkles, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import type { ClassificationResult } from "@/types";

export default function UploadPage() {
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);

      // Tạo URL cho hình ảnh đã tải lên
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);

      const data = await classifyProduct(file);
      setResult(data);
    } catch (err) {
      setError("Không thể phân loại hình ảnh. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setResult(null);
    setError(null);
    setUploadedImage(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Phân loại sản phẩm bằng AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Tải lên hình ảnh sản phẩm và để AI phân loại tự động. Công nghệ của
            chúng tôi sẽ nhận diện và phân loại sản phẩm chính xác.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-blue-600" />
              Tải lên hình ảnh
            </h2>
            <p className="mb-6 text-gray-600">
              Hỗ trợ các định dạng JPG, PNG và GIF. Kích thước tối đa 10MB.
            </p>

            <ImageUploader onUpload={handleUpload} isLoading={isLoading} />

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6">
            {isLoading ? (
              <LoadingState message="Đang phân tích hình ảnh..." />
            ) : error ? (
              <ErrorState message={error} onRetry={handleRetry} />
            ) : result ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center">
                {uploadedImage && (
                  <div className="mb-6 relative mx-auto w-48 h-48 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 bg-blue-50 rounded-lg mb-6">
                  <h3 className="font-medium text-blue-800 mb-2">
                    Kết quả phân loại
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">
                    {result.category}
                  </p>
                  <p className="text-sm text-blue-600">
                    Độ chính xác: {result.confidence}%
                  </p>
                </div>

                <div className="mt-6">
                  <Link href={`/categories/${result.category}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <ShoppingBag className="mr-2 h-5 w-5" /> Xem sản phẩm
                      tương tự
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p>Tải lên hình ảnh để xem kết quả phân loại</p>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Cách thức hoạt động
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-medium mb-2">Tải lên hình ảnh</h3>
              <p className="text-gray-600">
                Tải lên hình ảnh sản phẩm bạn muốn phân loại
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-medium mb-2">AI phân tích</h3>
              <p className="text-gray-600">
                Hệ thống AI của chúng tôi phân tích và nhận diện sản phẩm
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-medium mb-2">Nhận kết quả</h3>
              <p className="text-gray-600">
                Nhận kết quả phân loại và xem các sản phẩm tương tự
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
