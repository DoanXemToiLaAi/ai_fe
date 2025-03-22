import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Không tìm thấy trang
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link href="/">
        <Button className="bg-primary hover:bg-primary/90">
          <Home className="mr-2 h-4 w-4" /> Quay về trang chủ
        </Button>
      </Link>
    </div>
  );
}
