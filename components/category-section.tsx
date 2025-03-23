"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Smartphone,
  Watch,
  ShoppingBag,
  Headphones,
  Laptop,
} from "lucide-react";

const categories = [
  {
    name: "Điện thoại",
    icon: Smartphone,
    color: "from-blue-500 to-blue-700",
    link: "/categories/phones",
  },
  {
    name: "Đồng hồ",
    icon: Watch,
    color: "from-purple-500 to-purple-700",
    link: "/categories/watches",
  },
  {
    name: "Túi xách",
    icon: ShoppingBag,
    color: "from-pink-500 to-pink-700",
    link: "/categories/bags",
  },
  {
    name: "Tai nghe",
    icon: Headphones,
    color: "from-green-500 to-green-700",
    link: "/categories/headphones",
  },
  {
    name: "Laptop",
    icon: Laptop,
    color: "from-orange-500 to-orange-700",
    link: "/categories/laptops",
  },
];

export default function CategorySection() {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold mb-8 text-white">Danh mục sản phẩm</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}>
            <Link href={category.link}>
              <div
                className={`bg-gradient-to-br ${category.color} rounded-xl p-6 h-full flex flex-col items-center justify-center text-center transition-transform hover:scale-105 hover:shadow-lg hover:shadow-primary/10`}>
                <category.icon className="h-10 w-10 text-white mb-4" />
                <h3 className="text-lg font-medium text-white">
                  {category.name}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
