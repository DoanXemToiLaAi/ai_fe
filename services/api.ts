// API service functions to interact with the backend
import type {
  HomeData,
  ProductData,
  ClassificationResult,
  SentimentResult,
  RecommendationsData,
  ApiError,
} from "@/types"

// Thêm URL cơ sở
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Hàm helper để tạo headers
const createHeaders = (userId?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (userId) {
    headers["user_id"] = userId
  }

  return headers
}

// Hàm helper để log API calls (giúp debug)
const logApiCall = (endpoint: string, method = "GET", data?: any) => {
  console.log(`🔄 API Call: ${method} ${baseUrl}${endpoint}`)
  if (data) {
    console.log("Request data:", data)
  }
}

// Hàm helper để log API responses (giúp debug)
const logApiResponse = (endpoint: string, response: any, error?: any) => {
  if (error) {
    console.error(`❌ API Error (${endpoint}):`, error)
    return
  }
  console.log(`✅ API Response (${endpoint}):`, response)
}

// Hàm helper để xử lý lỗi API
const handleApiError = (error: any, endpoint: string): ApiError => {
  logApiResponse(endpoint, null, error)

  if (error instanceof Response) {
    return {
      status: error.status,
      message: `API Error: ${error.statusText}`,
    }
  }

  return {
    status: 500,
    message: error.message || "Unknown error occurred",
    details: error,
  }
}

// Hàm helper để fetch data từ API
async function fetchFromApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      cache: "no-store", // Disable caching to always get fresh data
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    logApiResponse(endpoint, data)
    return data as T
  } catch (error) {
    throw handleApiError(error, endpoint)
  }
}

// Get home page data
export async function getHomeData(userId?: string): Promise<HomeData> {
  const endpoint = "/home"
  logApiCall(endpoint)

  try {
    const headers = createHeaders(userId)
    return await fetchFromApi<HomeData>(endpoint, { headers })
  } catch (error) {
    console.error("Error fetching home data:", error)
    // Return mock data for development
    return {
      featured_products: [
        {
          _id: "p1",
          name: "Premium Headphones",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "electronics",
          price: 2500000,
          discount_price: 2000000,
          rating: 4.5,
        },
        {
          _id: "p2",
          name: "Stylish Sneakers",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "shoes",
          price: 1800000,
        },
        {
          _id: "p3",
          name: "Designer Backpack",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "bags",
          price: 1200000,
        },
      ],
      recommended_products: [
        {
          _id: "p4",
          name: "Wireless Earbuds",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "electronics",
          price: 1500000,
        },
        {
          _id: "p5",
          name: "Smart Watch",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "electronics",
          price: 3200000,
        },
        {
          _id: "p6",
          name: "Running Shoes",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "shoes",
          price: 2200000,
        },
        {
          _id: "p7",
          name: "Leather Wallet",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "accessories",
          price: 800000,
        },
      ],
    }
  }
}

// Get product details
export async function getProductData(productId: string): Promise<ProductData> {
  const endpoint = `/product-page/${productId}`
  logApiCall(endpoint)

  try {
    const headers = createHeaders()
    return await fetchFromApi<ProductData>(endpoint, { headers })
  } catch (error) {
    console.error("Error fetching product data:", error)
    // Return mock data for development
    return {
      product: {
        _id: productId,
        name: "Sample Product",
        description:
          "This is a sample product description. It would typically contain details about the product features, materials, and other relevant information.",
        image_url: "/placeholder.svg?height=600&width=600",
        category: "sample",
        price: 2500000,
        discount_price: 2000000,
        rating: 4.5,
        stock: 10,
      },
      reviews: [
        { user: "John Doe", review: "Great product, I love it!", sentiment: "positive", rating: 5 },
        { user: "Jane Smith", review: "Good quality but a bit expensive.", sentiment: "neutral", rating: 4 },
        { user: "Mike Johnson", review: "Not what I expected.", sentiment: "negative", rating: 2 },
      ],
      related_products: [
        {
          _id: "r1",
          name: "Related Product 1",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "sample",
          price: 2200000,
        },
        {
          _id: "r2",
          name: "Related Product 2",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "sample",
          price: 1800000,
        },
        {
          _id: "r3",
          name: "Related Product 3",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "sample",
          price: 3200000,
        },
        {
          _id: "r4",
          name: "Related Product 4",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "sample",
          price: 2700000,
        },
      ],
    }
  }
}

// Classify product image
export async function classifyProduct(image: File): Promise<ClassificationResult> {
  const endpoint = "/classify-product"
  logApiCall(endpoint, "POST", { file: image.name })

  try {
    const formData = new FormData()
    formData.append("image", image)

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Failed to classify image: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    logApiResponse(endpoint, data)
    return data
  } catch (error) {
    logApiResponse(endpoint, null, error)
    console.error("Error classifying image:", error)
    // Return mock data for development in case of error
    return {
      category: "shoes",
      confidence: 0.95,
      similar_products: [
        {
          _id: "s1",
          name: "Nike Air Max",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "shoes",
          price: 3200000,
        },
        {
          _id: "s2",
          name: "Adidas Ultraboost",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "shoes",
          price: 3800000,
        },
      ],
    }
  }
}

// Analyze review sentiment
export async function analyzeReview(review: string): Promise<SentimentResult> {
  const endpoint = "/analyze-review"
  logApiCall(endpoint, "POST", { review })

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review }),
    })

    if (!response.ok) {
      throw new Error(`Failed to analyze review: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    logApiResponse(endpoint, data)
    return data
  } catch (error) {
    logApiResponse(endpoint, null, error)
    console.error("Error analyzing review:", error)
    // Return mock data for development in case of error
    return {
      sentiment: "positive",
      confidence: 0.92,
      keywords: ["great", "love", "excellent"],
    }
  }
}

// Get personalized recommendations
export async function getRecommendations(userId: string): Promise<RecommendationsData> {
  const endpoint = `/recommendations/${userId}`
  logApiCall(endpoint)

  try {
    const headers = createHeaders()
    return await fetchFromApi<RecommendationsData>(endpoint, { headers })
  } catch (error) {
    console.error("Error fetching recommendations:", error)
    // Return mock data for development
    return {
      recommended_products: [
        {
          _id: "rec1",
          name: "Recommended Product 1",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "electronics",
          price: 4200000,
        },
        {
          _id: "rec2",
          name: "Recommended Product 2",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "clothing",
          price: 1800000,
        },
        {
          _id: "rec3",
          name: "Recommended Product 3",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "home",
          price: 2500000,
        },
        {
          _id: "rec4",
          name: "Recommended Product 4",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "beauty",
          price: 1200000,
        },
      ],
      user_preferences: ["electronics", "clothing", "premium"],
    }
  }
}

