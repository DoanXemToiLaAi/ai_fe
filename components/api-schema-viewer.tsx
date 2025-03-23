"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Code, Copy, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApiSchemaViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testError, setTestError] = useState<string | null>(null);

  const schemas = {
    home: {
      endpoint: "/home",
      method: "GET",
      description:
        "Endpoint cho trang chủ, trả về sản phẩm nổi bật và sản phẩm được đề xuất",
      schema: {
        featured_products: [
          {
            _id: "p1",
            name: "Premium Headphones",
            image_url: "https://example.com/headphones.jpg",
            category: "electronics",
            price: 2500000,
            discount_price: 2000000,
            description: "Tai nghe cao cấp với âm thanh vượt trội",
            rating: 4.5,
          },
        ],
        recommended_products: [
          {
            _id: "p2",
            name: "Stylish Sneakers",
            image_url: "https://example.com/sneakers.jpg",
            category: "shoes",
            price: 1800000,
            discount_price: 1500000,
            description: "Giày sneaker thời trang",
            rating: 4.2,
          },
        ],
      },
    },
    product: {
      endpoint: "/product-page/{id}",
      method: "GET",
      description:
        "Endpoint cho trang chi tiết sản phẩm, trả về thông tin sản phẩm, đánh giá và sản phẩm liên quan",
      schema: {
        product: {
          _id: "p1",
          name: "Premium Headphones",
          description:
            "Tai nghe cao cấp với âm thanh vượt trội và công nghệ khử tiếng ồn, hỗ trợ kết nối Bluetooth 5.0",
          image_url: "https://example.com/headphones.jpg",
          category: "electronics",
          price: 2500000,
          discount_price: 2000000,
          rating: 4.5,
          specifications: {
            brand: "Sony",
            model: "WH-1000XM4",
            color: "Black",
            warranty: "12 months",
          },
          stock: 15,
        },
        reviews: [
          {
            user: "John Doe",
            review: "Sản phẩm tuyệt vời, âm thanh rất trong trẻo!",
            sentiment: "positive",
            date: "2023-10-15",
            rating: 5,
          },
          {
            user: "Jane Smith",
            review: "Chất lượng tốt nhưng hơi đắt.",
            sentiment: "neutral",
            date: "2023-09-22",
            rating: 4,
          },
        ],
        related_products: [
          {
            _id: "p3",
            name: "Wireless Earbuds",
            image_url: "https://example.com/earbuds.jpg",
            category: "electronics",
            price: 1200000,
            discount_price: null,
            rating: 4.3,
          },
        ],
      },
    },
    classify: {
      endpoint: "/classify-product",
      method: "POST",
      description: "Endpoint để phân loại ảnh sản phẩm",
      requestFormat: 'FormData với field "image"',
      schema: {
        category: "shoes",
        confidence: 0.95,
        similar_products: [
          {
            _id: "p2",
            name: "Stylish Sneakers",
            image_url: "https://example.com/sneakers.jpg",
            category: "shoes",
            price: 1800000,
          },
        ],
      },
    },
    review: {
      endpoint: "/analyze-review",
      method: "POST",
      description: "Endpoint để phân tích cảm xúc từ đánh giá",
      schema: {
        request: {
          review: "Sản phẩm tuyệt vời, tôi rất hài lòng!",
        },
        response: {
          sentiment: "positive",
          confidence: 0.92,
          keywords: ["tuyệt vời", "hài lòng"],
        },
      },
    },
    recommendations: {
      endpoint: "/recommendations/{user_id}",
      method: "GET",
      description: "Endpoint để lấy sản phẩm được đề xuất cá nhân hóa",
      schema: {
        recommended_products: [
          {
            _id: "rec1",
            name: "Smart Watch",
            image_url: "https://example.com/watch.jpg",
            category: "electronics",
            price: 3200000,
            rating: 4.7,
          },
        ],
        user_preferences: ["electronics", "wearables", "premium"],
      },
    },
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const testEndpoint = async () => {
    setIsLoading(true);
    setTestError(null);
    setTestResponse(null);

    try {
      // @ts-ignore
      let endpoint = schemas[activeTab].endpoint;

      // Thay thế các tham số trong endpoint
      if (endpoint.includes("{id}")) {
        endpoint = endpoint.replace("{id}", "p1");
      }
      if (endpoint.includes("{user_id}")) {
        endpoint = endpoint.replace("{user_id}", "u1");
      }

      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      // @ts-ignore
      const method = schemas[activeTab].method;

      let response;
      if (method === "GET") {
        response = await fetch(`${baseUrl}${endpoint}`);
      } else if (method === "POST") {
        if (activeTab === "review") {
          response = await fetch(`${baseUrl}${endpoint}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              review: "Sản phẩm tuyệt vời, tôi rất hài lòng!",
            }),
          });
        } else {
          // Không thể test classify-product vì cần file
          setTestError("Không thể test endpoint này vì cần tải lên file");
          setIsLoading(false);
          return;
        }
      }

      if (!response?.ok) {
        throw new Error(`HTTP error! status: ${response?.status}`);
      }

      const data = await response?.json();
      setTestResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error testing endpoint:", error);
      setTestError(
        `Lỗi khi test endpoint: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed bottom-32 right-0 z-50 w-full max-w-md"
      data-testid="api-schema-viewer">
      <div className="bg-gray-900 border border-gray-800 text-white rounded-l-lg shadow-lg">
        <div
          className="flex justify-between items-center p-3 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}>
          <h3 className="font-medium flex items-center">
            <Code className="w-4 h-4 mr-2" /> API Schema Viewer
          </h3>
          <div>
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </div>
        </div>

        {isOpen && (
          <div>
            <div className="border-t border-gray-800 overflow-x-auto">
              <div className="flex">
                {Object.keys(schemas).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTab(key);
                      setTestResponse(null);
                      setTestError(null);
                    }}
                    className={`px-4 py-2 text-sm ${
                      activeTab === key
                        ? "border-b-2 border-primary text-primary"
                        : "text-gray-400 hover:text-white"
                    }`}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 max-h-96 overflow-auto">
              {/* @ts-ignore */}
              <div className="mb-2 text-xs text-gray-400">
                {schemas[activeTab].endpoint} ({schemas[activeTab].method})
              </div>
              {/* @ts-ignore */}
              <div className="mb-2 text-sm">
                {schemas[activeTab].description}
              </div>

              <div className="mt-2 relative">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-400">Schema</span>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="p-1 h-8 w-8"
                      onClick={() => {
                        /* @ts-ignore */
                        copyToClipboard(
                          JSON.stringify(schemas[activeTab].schema, null, 2)
                        );
                      }}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="p-1 h-8 w-8"
                      onClick={testEndpoint}
                      disabled={isLoading}>
                      {isLoading ? (
                        <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <pre className="bg-black border border-gray-800 p-3 rounded text-xs overflow-auto max-h-64">
                  {/* @ts-ignore */}
                  {JSON.stringify(schemas[activeTab].schema, null, 2)}
                </pre>
              </div>

              {testResponse && (
                <div className="mt-4 relative">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-gray-400">Test Response</span>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-1 h-8 w-8"
                        onClick={() => copyToClipboard(testResponse)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-1 h-8 w-8"
                        onClick={() => setTestResponse(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <pre className="bg-black border border-gray-800 p-3 rounded text-xs overflow-auto max-h-64">
                    {testResponse}
                  </pre>
                </div>
              )}

              {testError && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-900/50 rounded text-xs text-red-400">
                  {testError}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
