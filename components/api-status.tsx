"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface ApiStatusProps {
  endpoint?: string;
  showEndpoint?: boolean;
}

export default function ApiStatus({
  endpoint = "/home",
  showEndpoint = true,
}: ApiStatusProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState<string>("");
  const [responseTime, setResponseTime] = useState<number | null>(null);

  useEffect(() => {
    const checkApiStatus = async () => {
      setStatus("loading");
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const startTime = performance.now();

      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        const endTime = performance.now();
        setResponseTime(Math.round(endTime - startTime));

        if (response.ok) {
          setStatus("success");
          setMessage("API đang hoạt động");
        } else {
          setStatus("error");
          setMessage(`Lỗi: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        setStatus("error");
        setMessage(
          `Không thể kết nối đến API: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    };

    checkApiStatus();
  }, [endpoint]);

  return (
    <div className="flex items-center space-x-2 text-sm">
      {status === "loading" && (
        <>
          <div className="h-4 w-4 border-2 border-t-transparent border-primary rounded-full animate-spin"></div>
          <span className="text-gray-400">Đang kiểm tra kết nối API...</span>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-green-500">
            {message}
            {responseTime && ` (${responseTime}ms)`}
            {showEndpoint && ` - ${endpoint}`}
          </span>
        </>
      )}

      {status === "error" && (
        <>
          <XCircle className="h-4 w-4 text-red-500" />
          <span className="text-red-500">
            {message}
            {showEndpoint && ` - ${endpoint}`}
          </span>
        </>
      )}
    </div>
  );
}
