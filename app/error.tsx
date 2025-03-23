"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log lỗi để debug
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Đã xảy ra lỗi</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.</p>
      <Button onClick={() => reset()} className="bg-primary hover:bg-primary/90">
        <RefreshCcw className="mr-2 h-4 w-4" /> Thử lại
      </Button>
    </div>
  )
}

