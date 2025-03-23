"use client";

import { useState } from "react";
import { ArrowLeft, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ApiStatus from "@/components/api-status";

interface ApiTestResult {
  endpoint: string;
  method: string;
  status: "pending" | "success" | "error" | "loading";
  responseTime?: number;
  response?: any;
  error?: string;
}

export default function ApiTestPage() {
  const [testResults, setTestResults] = useState<ApiTestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiEndpoints = [
    { endpoint: "/home", method: "GET", description: "Trang chủ" },
    {
      endpoint: "/product-page/p1",
      method: "GET",
      description: "Chi tiết sản phẩm",
    },
    {
      endpoint: "/recommendations/user1",
      method: "GET",
      description: "Gợi ý sản phẩm",
    },
  ];

  const testAllEndpoints = async () => {
    setIsLoading(true);

    // Khởi tạo kết quả test với trạng thái "pending"
    const initialResults = apiEndpoints.map((endpoint) => ({
      endpoint: endpoint.endpoint,
      method: endpoint.method,
      status: "pending" as const,
    }));

    setTestResults(initialResults);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    // Test từng endpoint
    const updatedResults = [...initialResults];

    for (let i = 0; i < apiEndpoints.length; i++) {
      const endpoint = apiEndpoints[i];
      updatedResults[i].status = "loading";
      setTestResults([...updatedResults]);

      const startTime = performance.now();

      try {
        const response = await fetch(`${baseUrl}${endpoint.endpoint}`, {
          method: endpoint.method,
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);

        if (response.ok) {
          const data = await response.json();
          updatedResults[i] = {
            ...updatedResults[i],
            status: "success",
            responseTime,
            response: data,
          };
        } else {
          updatedResults[i] = {
            ...updatedResults[i],
            status: "error",
            responseTime,
            error: `${response.status} ${response.statusText}`,
          };
        }
      } catch (error) {
        updatedResults[i] = {
          ...updatedResults[i],
          status: "error",
          error: error instanceof Error ? error.message : String(error),
        };
      }

      setTestResults([...updatedResults]);
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang chủ
        </Link>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">API Test</h1>
          <Button
            onClick={testAllEndpoints}
            disabled={isLoading}
            className="flex items-center">
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Đang test...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Test tất cả API
              </>
            )}
          </Button>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Trạng thái API
          </h2>
          <ApiStatus showEndpoint={false} />
        </div>

        <div className="space-y-6">
          {apiEndpoints.map((endpoint, index) => (
            <div
              key={endpoint.endpoint}
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-800">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">
                    {endpoint.description}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">
                      {endpoint.method} {endpoint.endpoint}
                    </span>
                    {testResults[index]?.status === "success" && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {testResults[index]?.status === "error" && (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    {testResults[index]?.status === "loading" && (
                      <div className="h-4 w-4 border-2 border-t-transparent border-primary rounded-full animate-spin"></div>
                    )}
                  </div>
                </div>
              </div>

              {testResults[index] &&
                testResults[index].status !== "pending" && (
                  <div className="p-4">
                    {testResults[index].status === "loading" && (
                      <div className="flex items-center justify-center p-4">
                        <div className="h-8 w-8 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
                      </div>
                    )}

                    {testResults[index].status === "success" && (
                      <div>
                        <div className="flex items-center mb-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-green-500">
                            Thành công
                            {testResults[index].responseTime &&
                              ` (${testResults[index].responseTime}ms)`}
                          </span>
                        </div>
                        <div className="bg-black rounded p-4 overflow-auto max-h-96">
                          <pre className="text-xs text-gray-300">
                            {JSON.stringify(
                              testResults[index].response,
                              null,
                              2
                            )}
                          </pre>
                        </div>
                      </div>
                    )}

                    {testResults[index].status === "error" && (
                      <div>
                        <div className="flex items-center mb-2">
                          <XCircle className="h-4 w-4 text-red-500 mr-2" />
                          <span className="text-red-500">
                            Lỗi: {testResults[index].error}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
