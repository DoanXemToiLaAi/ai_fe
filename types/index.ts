// Type definitions for the application

export interface Product {
  _id: string;
  name: string;
  description?: string;
  image_url: string;
  category: string;
  // Thêm các trường khác nếu backend trả về
  price?: number;
  discount_price?: number;
  rating?: number;
  stock?: number;
}

export interface Review {
  user: string;
  review: string;
  sentiment: "positive" | "negative" | "neutral";
  // Thêm các trường khác nếu backend trả về
  date?: string;
  rating?: number;
}

export interface HomeData {
  featured_products: Product[];
  recommended_products: Product[];
  // Thêm các trường khác nếu backend trả về
  categories?: string[];
  banners?: Banner[];
}

export interface Banner {
  id: string;
  image_url: string;
  title?: string;
  description?: string;
  link?: string;
}

export interface ProductData {
  product: Product;
  reviews: Review[];
  related_products: Product[];
  // Thêm các trường khác nếu backend trả về
}

export interface RecommendationsData {
  recommended_products: Product[];
  // Thêm các trường khác nếu backend trả về
  user_preferences?: string[];
}

export interface ClassificationResult {
  category: string;
  // Thêm các trường khác nếu backend trả về
  confidence?: number;
  similar_products?: Product[];
}

export interface SentimentResult {
  sentiment: "positive" | "negative" | "neutral";
  // Thêm các trường khác nếu backend trả về
  confidence?: number;
  keywords?: string[];
}

export interface ApiError {
  status: number;
  message: string;
  details?: any;
}
