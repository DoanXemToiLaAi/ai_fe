// Type definitions for the application

export interface Product {
  _id: string
  name: string
  description?: string
  image_url: string
  category: string
  price: number
  discount_price?: number | null
  rating?: number
  stock?: number
  specifications?: ProductSpecifications
}

export interface ProductSpecifications {
  brand?: string
  model?: string
  color?: string
  warranty?: string
  connectivity?: string
  battery_life?: string
  weight?: string
  features?: string[]
  [key: string]: any // Cho phép các trường động khác
}

export interface Review {
  user: string
  review: string
  sentiment: "positive" | "negative" | "neutral"
  date?: string
  rating?: number
}

export interface HomeData {
  featured_products: Product[]
  recommended_products: Product[]
  categories?: string[]
  banners?: Banner[]
}

export interface Banner {
  id: string
  image_url: string
  title?: string
  description?: string
  link?: string
}

export interface ProductData {
  product: Product
  reviews: Review[]
  related_products: Product[]
}

export interface RecommendationsData {
  recommended_products: Product[]
  user_preferences?: string[]
}

export interface ClassificationResult {
  category: string
  confidence?: number
  similar_products?: Product[]
}

export interface SentimentResult {
  sentiment: "positive" | "negative" | "neutral"
  confidence?: number
  keywords?: string[]
}

// Thêm interface ApiError để xử lý lỗi từ API
export interface ApiError {
  status: number
  message: string
  details?: any
}

// Thêm interface ApiResponse để xử lý response từ API
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// Thêm interface ApiRequest để xử lý request đến API
export interface ApiRequest {
  endpoint: string
  method: string
  body?: any
  headers?: Record<string, string>
}

