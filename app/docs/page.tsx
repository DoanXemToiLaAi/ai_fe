"use client"

import Link from "next/link"
import { ArrowLeft, Code, Database, FileJson, Server } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang chủ
        </Link>

        <h1 className="text-3xl font-bold mb-6 text-white">API Documentation</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Server className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold text-white">Backend API</h2>
            </div>
            <p className="text-gray-400 mb-4">Tài liệu API cho backend developers</p>
            <Link
              href="/docs/api"
              className="inline-block px-4 py-2 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors"
            >
              Xem API Docs
            </Link>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Code className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold text-white">Frontend Guide</h2>
            </div>
            <p className="text-gray-400 mb-4">Hướng dẫn cho frontend developers</p>
            <Link
              href="/docs/frontend"
              className="inline-block px-4 py-2 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors"
            >
              Xem Frontend Guide
            </Link>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Database className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-xl font-semibold text-white">Data Models</h2>
            </div>
            <p className="text-gray-400 mb-4">Mô hình dữ liệu và schemas</p>
            <Link
              href="/docs/models"
              className="inline-block px-4 py-2 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors"
            >
              Xem Data Models
            </Link>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Tổng quan API</h2>
          <p className="text-gray-400 mb-6">
            API của chúng tôi được thiết kế theo mô hình Backend For Frontend (BFF), mỗi endpoint được tối ưu hóa cho
            một màn hình cụ thể trong ứng dụng.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-3 px-4 text-left text-white">Endpoint</th>
                  <th className="py-3 px-4 text-left text-white">Method</th>
                  <th className="py-3 px-4 text-left text-white">Mô tả</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-gray-300 font-mono text-sm">/home</td>
                  <td className="py-3 px-4 text-gray-300">GET</td>
                  <td className="py-3 px-4 text-gray-400">Lấy dữ liệu cho trang chủ</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-gray-300 font-mono text-sm">/product-page/{"{id}"}</td>
                  <td className="py-3 px-4 text-gray-300">GET</td>
                  <td className="py-3 px-4 text-gray-400">Lấy dữ liệu cho trang chi tiết sản phẩm</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-gray-300 font-mono text-sm">/classify-product</td>
                  <td className="py-3 px-4 text-gray-300">POST</td>
                  <td className="py-3 px-4 text-gray-400">Phân loại ảnh sản phẩm</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 text-gray-300 font-mono text-sm">/analyze-review</td>
                  <td className="py-3 px-4 text-gray-300">POST</td>
                  <td className="py-3 px-4 text-gray-400">Phân tích cảm xúc từ đánh giá</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-300 font-mono text-sm">/recommendations/{"{user_id}"}</td>
                  <td className="py-3 px-4 text-gray-300">GET</td>
                  <td className="py-3 px-4 text-gray-400">Lấy sản phẩm được đề xuất cá nhân hóa</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Tài liệu tham khảo</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Tài liệu API</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/BACKEND_SCHEMA.md" className="flex items-center text-primary hover:text-primary/80">
                    <FileJson className="h-4 w-4 mr-2" /> BACKEND_SCHEMA.md
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/your-repo/api-docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-primary/80"
                  >
                    <FileJson className="h-4 w-4 mr-2" /> GitHub Repository
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-white">Công cụ</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="flex items-center text-primary hover:text-primary/80"
                    onClick={(e) => {
                      e.preventDefault()
                      document
                        .querySelector('[data-testid="api-schema-viewer"]')
                        ?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <Code className="h-4 w-4 mr-2" /> API Schema Viewer
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center text-primary hover:text-primary/80"
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector('[data-testid="api-debug"]')?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <Server className="h-4 w-4 mr-2" /> API Debug Tool
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

