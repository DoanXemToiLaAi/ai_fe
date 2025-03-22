// API service functions to interact with the backend

// Thêm URL cơ sở
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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

// Get home page data
export async function getHomeData(userId?: string) {
  try {
    const headers = createHeaders(userId);

    const response = await fetch(`${baseUrl}/home`, { headers });

    if (!response.ok) {
      throw new Error("Failed to fetch home data");
    }

    return await response.json();
  } catch (error) {
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
  try {
    const headers = createHeaders();

    const response = await fetch(`${baseUrl}/product-page/${productId}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }

    return await response.json();
  } catch (error) {
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
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(`${baseUrl}/classify-product`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to classify image");
    }

    return await response.json();
  } catch (error) {
    console.error("Error classifying image:", error);
    throw error;
  }
}

// Analyze review sentiment
export async function analyzeReview(review: string) {
  try {
    const response = await fetch(`${baseUrl}/analyze-review/huggingface`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review }),
    });

    if (!response.ok) {
      throw new Error("Failed to analyze review");
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing review:", error);
    throw error;
  }
}

// Get personalized recommendations
export async function getRecommendations(userId: string) {
  try {
    const headers = createHeaders();

    const response = await fetch(`${baseUrl}/recommendations/${userId}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations");
    }

    return await response.json();
  } catch (error) {
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
