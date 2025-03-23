"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, X, Heart, Upload, Sparkles, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-gray-800" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">
            AI Shop
          </Link>

          <div className="relative w-full max-w-md mx-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="block w-full pl-10 pr-3 py-2 bg-gray-900/70 border border-gray-700 rounded-md leading-5 text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/docs" className="text-gray-300 hover:text-primary transition-colors">
              <span className="sr-only">Documentation</span>
              <span className="px-3 py-1 text-sm border border-gray-700 text-gray-300 rounded-md hover:bg-gray-800 transition-colors">
                Docs
              </span>
            </Link>
            <Link href="/upload" className="text-gray-300 hover:text-primary transition-colors">
              <span className="sr-only">Upload Image</span>
              <span className="px-3 py-1 text-sm border border-primary text-primary rounded-md hover:bg-primary/20 transition-colors">
                AI Classify
              </span>
            </Link>
            <Link href="/recommendations/user123" className="text-gray-300 hover:text-white transition-colors">
              <span className="sr-only">Recommendations</span>
              <span className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                For You
              </span>
            </Link>
            <Link href="/account" className="text-gray-300 hover:text-white transition-colors">
              <span className="sr-only">Account</span>
              <User className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="text-gray-300 hover:text-white transition-colors">
              <span className="sr-only">Cart</span>
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link href="/" className="block py-2 text-gray-300 hover:text-white transition-colors">
                Trang chủ
              </Link>
              <Link href="/categories" className="block py-2 text-gray-300 hover:text-white transition-colors">
                Danh mục
              </Link>
              <Link href="/deals" className="block py-2 text-gray-300 hover:text-white transition-colors">
                Khuyến mãi
              </Link>
              <Link href="/about" className="block py-2 text-gray-300 hover:text-white transition-colors">
                Giới thiệu
              </Link>
              <div className="pt-4 border-t border-gray-800 grid grid-cols-3 gap-2">
                <Link
                  href="/upload"
                  className="flex flex-col items-center p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Upload className="h-6 w-6 mb-1" />
                  <span className="text-xs">Tải ảnh</span>
                </Link>
                <Link
                  href="/recommendations/user123"
                  className="flex flex-col items-center p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Sparkles className="h-6 w-6 mb-1" />
                  <span className="text-xs">Gợi ý</span>
                </Link>
                <Link
                  href="/wishlist"
                  className="flex flex-col items-center p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Heart className="h-6 w-6 mb-1" />
                  <span className="text-xs">Yêu thích</span>
                </Link>
                <Link
                  href="/account"
                  className="flex flex-col items-center p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <User className="h-6 w-6 mb-1" />
                  <span className="text-xs">Tài khoản</span>
                </Link>
                <Link
                  href="/cart"
                  className="flex flex-col items-center p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="relative">
                    <ShoppingCart className="h-6 w-6 mb-1" />
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  </div>
                  <span className="text-xs">Giỏ hàng</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

