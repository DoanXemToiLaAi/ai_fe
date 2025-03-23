import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

export default function LoadingState({
  message = "Đang tải dữ liệu...",
  size = "medium",
}: LoadingStateProps) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2
        className={`${sizeClasses[size]} text-primary animate-spin mb-4`}
      />
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}
