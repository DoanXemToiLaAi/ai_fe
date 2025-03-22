// API service functions to interact with the backend

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

// Get home page data
export async function getHomeData(userId?: string) {
  const endpoint = "/home";
  logApiCall(endpoint);

  try {
    const headers = createHeaders(userId);

    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers,
      cache: "no-store", // Disable caching to always get fresh data
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch home data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    logApiResponse(endpoint, data);
    return data;
  } catch (error) {
    logApiResponse(endpoint, null, error);
    console.error("Error fetching home data:", error);
    // Return mock data for development
    return {
      featured_products: [
        {
          _id: "p1",
          name: "Premium Headphones",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "electronics",
        },
        {
          _id: "p2",
          name: "Stylish Sneakers",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "shoes",
        },
        {
          _id: "p3",
          name: "Designer Backpack",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "bags",
        },
      ],
      recommended_products: [
        {
          _id: "p4",
          name: "Wireless Earbuds",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "electronics",
        },
        {
          _id: "p5",
          name: "Smart Watch",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "electronics",
        },
        {
          _id: "p6",
          name: "Running Shoes",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "shoes",
        },
        {
          _id: "p7",
          name: "Leather Wallet",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "accessories",
        },
      ],
    };
  }
}

// Get product details
export async function getProductData(productId: string) {
  const endpoint = `/product-page/${productId}`;
  logApiCall(endpoint);

  try {
    const headers = createHeaders();

    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    logApiResponse(endpoint, data);
    return data;
  } catch (error) {
    logApiResponse(endpoint, null, error);
    console.error("Error fetching product data:", error);
    // Return mock data for development
    return {
      product: {
        _id: productId,
        name: "Sample Product",
        description:
          "This is a sample product description. It would typically contain details about the product features, materials, and other relevant information.",
        image_url: "/placeholder.svg?height=600&width=600",
        category: "sample",
      },
      reviews: [
        {
          user: "John Doe",
          review: "Great product, I love it!",
          sentiment: "positive",
        },
        {
          user: "Jane Smith",
          review: "Good quality but a bit expensive.",
          sentiment: "neutral",
        },
        {
          user: "Mike Johnson",
          review: "Not what I expected.",
          sentiment: "negative",
        },
      ],
      related_products: [
        {
          _id: "r1",
          name: "Related Product 1",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "sample",
        },
        {
          _id: "r2",
          name: "Related Product 2",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "sample",
        },
        {
          _id: "r3",
          name: "Related Product 3",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "sample",
        },
        {
          _id: "r4",
          name: "Related Product 4",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "sample",
        },
      ],
    };
  }
}

// Classify product image
export async function classifyProduct(image: File) {
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
    // Return mock data for development in case of error
    return {
      category: "shoes",
    };
  }
}

// Analyze review sentiment
export async function analyzeReview(review: string) {
  const endpoint = "/analyze-review";
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
    // Return mock data for development in case of error
    return {
      sentiment: "positive",
    };
  }
}

// Get personalized recommendations
export async function getRecommendations(userId: string) {
  const endpoint = `/recommendations/${userId}`;
  logApiCall(endpoint);

  try {
    const headers = createHeaders();

    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch recommendations: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    logApiResponse(endpoint, data);
    return data;
  } catch (error) {
    logApiResponse(endpoint, null, error);
    console.error("Error fetching recommendations:", error);
    // Return mock data for development
    return {
      recommended_products: [
        {
          _id: "rec1",
          name: "Recommended Product 1",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "electronics",
        },
        {
          _id: "rec2",
          name: "Recommended Product 2",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "clothing",
        },
        {
          _id: "rec3",
          name: "Recommended Product 3",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "home",
        },
        {
          _id: "rec4",
          name: "Recommended Product 4",
          image_url: "/placeholder.svg?height=400&width=400",
          category: "beauty",
        },
      ],
    };
  }
}
