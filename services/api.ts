// API service functions to interact with the backend
import type {
  HomeData,
  ProductData,
  ClassificationResult,
  SentimentResult,
  RecommendationsData,
  ApiError,
} from "@/types";

// Thêm URL cơ sở
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Hàm helper để tạo headers
const createHeaders = (userId?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (userId) {
    headers["user_id"] = userId;
  }

  return headers;
};

// Hàm helper để log API calls (giúp debug)
const logApiCall = (endpoint: string, method = "GET", data?: any) => {
  console.log(`🔄 API Call: ${method} ${baseUrl}${endpoint}`);
  if (data) {
    console.log("Request data:", data);
  }
};

// Hàm helper để log API responses (giúp debug)
const logApiResponse = (endpoint: string, response: any, error?: any) => {
  if (error) {
    console.error(`❌ API Error (${endpoint}):`, error);
    return;
  }
  console.log(`✅ API Response (${endpoint}):`, response);
};

// Hàm helper để xử lý lỗi API
const handleApiError = (error: any, endpoint: string): ApiError => {
  logApiResponse(endpoint, null, error);

  if (error instanceof Response) {
    return {
      status: error.status,
      message: `API Error: ${error.statusText}`,
    };
  }

  return {
    status: 500,
    message: error.message || "Unknown error occurred",
    details: error,
  };
};

// Hàm helper để fetch data từ API
async function fetchFromApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      cache: "no-store", // Disable caching to always get fresh data
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    logApiResponse(endpoint, data);
    return data as T;
  } catch (error) {
    throw handleApiError(error, endpoint);
  }
}

// Get home page data
export async function getHomeData(userId?: string): Promise<HomeData> {
  const endpoint = "/home";
  logApiCall(endpoint);

  try {
    const headers = createHeaders(userId);
    return await fetchFromApi<HomeData>(endpoint, { headers });
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error; // Ném lỗi để component xử lý
  }
}

// Get product details
export async function getProductData(productId: string): Promise<ProductData> {
  const endpoint = `/product-page/${productId}`;
  logApiCall(endpoint);

  try {
    const headers = createHeaders();
    return await fetchFromApi<ProductData>(endpoint, { headers });
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error; // Ném lỗi để component xử lý
  }
}

// Classify product image
export async function classifyProduct(
  image: File
): Promise<ClassificationResult> {
  const endpoint = "/classify-product";
  logApiCall(endpoint, "POST", { file: image.name });

  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to classify image: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    logApiResponse(endpoint, data);
    return data;
  } catch (error) {
    logApiResponse(endpoint, null, error);
    console.error("Error classifying image:", error);
    throw error; // Ném lỗi để component xử lý
  }
}

// Analyze review sentiment
export async function analyzeReview(review: string): Promise<SentimentResult> {
  const endpoint = "/analyze-review/huggingface";
  logApiCall(endpoint, "POST", { review });

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to analyze review: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    logApiResponse(endpoint, data);
    return data;
  } catch (error) {
    logApiResponse(endpoint, null, error);
    console.error("Error analyzing review:", error);
    throw error; // Ném lỗi để component xử lý
  }
}

// Get personalized recommendations
export async function getRecommendations(
  userId: string
): Promise<RecommendationsData> {
  const endpoint = `/recommendations/${userId}`;
  logApiCall(endpoint);

  try {
    const headers = createHeaders();
    return await fetchFromApi<RecommendationsData>(endpoint, { headers });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error; // Ném lỗi để component xử lý
  }
}
