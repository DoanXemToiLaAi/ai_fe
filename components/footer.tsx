"use client";

import Link from "next/link";
import {
  Github,
  Twitter,
  Instagram,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Server,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">AI Shop</h3>
            <p className="text-gray-400 mb-4">
              Ứng dụng e-commerce tích hợp AI giúp bạn tìm kiếm và mua sắm sản
              phẩm một cách thông minh.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Danh mục</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-primary transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-400 hover:text-primary transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/upload"
                  className="text-gray-400 hover:text-primary transition-colors">
                  Tải ảnh & Phân loại
                </Link>
              </li>
              <li>
                <Link
                  href="/recommendations/u1"
                  className="text-gray-400 hover:text-primary transition-colors">
                  Gợi ý cá nhân
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-primary transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-primary transition-colors">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-400 hover:text-primary transition-colors">
                  Tài liệu API
                </Link>
              </li>
              <li>
                <Link
                  href="/api-test"
                  className="text-gray-400 hover:text-primary transition-colors">
                  Kiểm tra API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  123 Đường AI, Quận Tech, TP. Innovation
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400">+84 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400">contact@ai-shop.com</span>
              </li>
              <li className="flex items-center">
                <Server className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400 text-sm">API: {apiUrl}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} AI Shop. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link
              href="/terms"
              className="text-gray-500 hover:text-primary text-sm transition-colors">
              Điều khoản sử dụng
            </Link>
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-primary text-sm transition-colors">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
