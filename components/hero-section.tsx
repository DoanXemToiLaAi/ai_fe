"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.2),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Mua sắm thông minh với AI
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Khám phá trải nghiệm mua sắm được cá nhân hóa với công nghệ AI
              tiên tiến. Tìm kiếm sản phẩm bằng hình ảnh và nhận gợi ý phù hợp
              với sở thích của bạn.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/upload">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Tìm bằng hình ảnh
                </Button>
              </Link>
              <Link href="/recommendations/user1">
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800 px-6 py-3 rounded-lg flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Gợi ý cho bạn
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative">
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="AI Shopping Experience"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 z-20">
                <p className="text-white font-medium">
                  Trải nghiệm mua sắm mới với AI
                </p>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-gray-900 p-4 rounded-lg shadow-lg z-20 border border-gray-800">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-sm font-medium">Được gợi ý bởi AI</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="#featured"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            Khám phá sản phẩm
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
