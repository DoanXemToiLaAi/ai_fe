// Type definitions for the application

export interface Product {
  _id: string
  name: string
  description?: string
  image_url: string
  category: string
}

export interface Review {
  user: string
  review: string
  sentiment: "positive" | "negative" | "neutral"
}

export interface HomeData {
  featured_products: Product[]
  recommended_products: Product[]
}

export interface ProductData {
  product: Product
  reviews: Review[]
  related_products: Product[]
}

export interface RecommendationsData {
  recommended_products: Product[]
}

export interface ClassificationResult {
  category: string
}

export interface SentimentResult {
  sentiment: "positive" | "negative" | "neutral"
}

