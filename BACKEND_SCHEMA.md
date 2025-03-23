# Cấu Trúc Dữ Liệu API cho Backend

Tài liệu này mô tả chi tiết cấu trúc dữ liệu mà Frontend cần từ Backend theo mô hình BFF (Backend For Frontend).

## Tổng Quan API

| Endpoint                     | Method | Mô tả                                   |
| ---------------------------- | ------ | --------------------------------------- |
| `/home`                      | GET    | Lấy dữ liệu cho trang chủ               |
| `/product-page/{id}`         | GET    | Lấy dữ liệu cho trang chi tiết sản phẩm |
| `/classify-product`          | POST   | Phân loại ảnh sản phẩm                  |
| `/analyze-review`            | POST   | Phân tích cảm xúc từ đánh giá           |
| `/recommendations/{user_id}` | GET    | Lấy sản phẩm được đề xuất cá nhân hóa   |

## 1. API Trang Chủ

### Endpoint: GET /home

Trả về dữ liệu cần thiết cho trang chủ, bao gồm sản phẩm nổi bật và sản phẩm được đề xuất.

#### Response:

```json
{
  "featured_products": [
    {
      "_id": "p1",
      "name": "Premium Headphones",
      "image_url": "https://example.com/headphones.jpg",
      "category": "electronics",
      "price": 2500000,
      "discount_price": 2000000,
      "description": "Tai nghe cao cấp với âm thanh vượt trội",
      "rating": 4.5
    }
  ],
  "recommended_products": [
    {
      "_id": "p2",
      "name": "Stylish Sneakers",
      "image_url": "https://example.com/sneakers.jpg",
      "category": "shoes",
      "price": 1800000,
      "discount_price": 1500000,
      "description": "Giày sneaker thời trang",
      "rating": 4.2
    }
  ]
}
```

## 2. API Trang Chi Tiết Sản Phẩm

### Endpoint: GET /product-page/id

Trả về thông tin chi tiết sản phẩm, đánh giá và sản phẩm liên quan.

#### Response:

```json
{
  "product": {
    "_id": "p1",
    "name": "Premium Headphones",
    "description": "Tai nghe cao cấp với âm thanh vượt trội và công nghệ khử tiếng ồn, hỗ trợ kết nối Bluetooth 5.0",
    "image_url": "https://example.com/headphones.jpg",
    "category": "electronics",
    "price": 2500000,
    "discount_price": 2000000,
    "rating": 4.5,
    "specifications": {
      "brand": "Sony",
      "model": "WH-1000XM4",
      "color": "Black",
      "warranty": "12 months"
    },
    "stock": 15
  },
  "reviews": [
    {
      "user": "John Doe",
      "review": "Sản phẩm tuyệt vời, âm thanh rất trong trẻo!",
      "sentiment": "positive",
      "date": "2023-10-15",
      "rating": 5
    },
    {
      "user": "Jane Smith",
      "review": "Chất lượng tốt nhưng hơi đắt.",
      "sentiment": "neutral",
      "date": "2023-09-22",
      "rating": 4
    }
  ],
  "related_products": [
    {
      "_id": "p3",
      "name": "Wireless Earbuds",
      "image_url": "https://example.com/earbuds.jpg",
      "category": "electronics",
      "price": 1200000,
      "discount_price": null,
      "rating": 4.3
    }
  ]
}
```

## 3. API Phân Loại Ảnh Sản Phẩm

### Endpoint: POST /classify-product

Phân loại ảnh sản phẩm được tải lên.

#### Request:

- Content-Type: `multipart/form-data`
- Form Field: `image` (file ảnh)

#### Response:

```json
{
  "category": "shoes",
  "confidence": 0.95,
  "similar_products": [
    {
      "_id": "p2",
      "name": "Stylish Sneakers",
      "image_url": "https://example.com/sneakers.jpg",
      "category": "shoes",
      "price": 1800000
    }
  ]
}
```

## 4. API Phân Tích Cảm Xúc Đánh Giá

### Endpoint: POST /analyze-review

Phân tích cảm xúc từ đánh giá của người dùng.

#### Request:

```json
{
  "review": "Sản phẩm tuyệt vời, tôi rất hài lòng!"
}
```

#### Response:

```json
{
  "sentiment": "positive",
  "confidence": 0.92,
  "keywords": ["tuyệt vời", "hài lòng"]
}
```

## 5. API Sản Phẩm Gợi Ý

### Endpoint: GET /recommendations/user_id

Lấy sản phẩm được đề xuất cá nhân hóa cho người dùng.

#### Response:

```json
{
  "recommended_products": [
    {
      "_id": "rec1",
      "name": "Smart Watch",
      "image_url": "https://example.com/watch.jpg",
      "category": "electronics",
      "price": 3200000,
      "rating": 4.7
    }
  ],
  "user_preferences": ["electronics", "wearables", "premium"]
}
```

## Cách Frontend Sử Dụng Dữ Liệu

1. **Trang Chủ:**

1. Hiển thị sản phẩm nổi bật trong carousel/grid lớn
1. Hiển thị sản phẩm được đề xuất trong grid nhỏ hơn

1. **Trang Chi Tiết Sản Phẩm:**

1. Hiển thị thông tin chi tiết sản phẩm
1. Hiển thị đánh giá với phân tích cảm xúc
1. Hiển thị sản phẩm liên quan

1. **Trang Upload Ảnh:**

1. Cho phép người dùng tải lên ảnh
1. Hiển thị kết quả phân loại và sản phẩm tương tự

1. **Trang Gợi Ý Sản Phẩm:**

1. Hiển thị sản phẩm được đề xuất dựa trên người dùng
1. Hiển thị lý do đề xuất dựa trên sở thích người dùng

## Lưu Ý Quan Trọng

- Tất cả URL ảnh phải là URL hợp lệ và có thể truy cập được
- Các trường `price` và `discount_price` là số nguyên, đơn vị VNĐ
- Trường `sentiment` trong đánh giá chỉ có thể là một trong ba giá trị: "positive", "negative", "neutral"
- Trạng thái HTTP 200 OK cho các request thành công
- Các lỗi sẽ trả về mã HTTP tương ứng (400, 404, 500, v.v.) với thông báo lỗi chi tiết

## Dữ Liệu Mẫu Cho Từng API

Dưới đây là dữ liệu mẫu chi tiết cho từng API endpoint mà backend có thể sử dụng để phát triển và kiểm thử:

### 1. Dữ Liệu Mẫu cho `/home`

```json
{
  "featured_products": [
    {
      "_id": "p1",
      "name": "Sony WH-1000XM4",
      "image_url": "https://example.com/images/sony-wh1000xm4.jpg",
      "category": "electronics",
      "price": 8500000,
      "discount_price": 7200000,
      "description": "Tai nghe chống ồn không dây cao cấp với công nghệ khử tiếng ồn hàng đầu",
      "rating": 4.8
    },
    {
      "_id": "p2",
      "name": "Nike Air Max 270",
      "image_url": "https://example.com/images/nike-airmax270.jpg",
      "category": "shoes",
      "price": 3600000,
      "discount_price": 2990000,
      "description": "Giày thể thao với đệm khí Nike Air Max đem lại cảm giác thoải mái tối đa",
      "rating": 4.6
    },
    {
      "_id": "p3",
      "name": "Samsung Galaxy Watch 5",
      "image_url": "https://example.com/images/samsung-watch5.jpg",
      "category": "electronics",
      "price": 6800000,
      "discount_price": 5990000,
      "description": "Đồng hồ thông minh với tính năng theo dõi sức khỏe toàn diện",
      "rating": 4.7
    }
  ],
  "recommended_products": [
    {
      "_id": "p4",
      "name": "Apple AirPods Pro",
      "image_url": "https://example.com/images/apple-airpods-pro.jpg",
      "category": "electronics",
      "price": 6200000,
      "discount_price": 5800000,
      "description": "Tai nghe không dây với khả năng khử tiếng ồn chủ động",
      "rating": 4.9
    },
    {
      "_id": "p5",
      "name": "Adidas Ultraboost 22",
      "image_url": "https://example.com/images/adidas-ultraboost22.jpg",
      "category": "shoes",
      "price": 4200000,
      "discount_price": 3700000,
      "description": "Giày chạy bộ với công nghệ đệm Boost đem lại khả năng đàn hồi tuyệt vời",
      "rating": 4.7
    },
    {
      "_id": "p6",
      "name": "Apple iPad Air",
      "image_url": "https://example.com/images/apple-ipad-air.jpg",
      "category": "electronics",
      "price": 16500000,
      "discount_price": 15200000,
      "description": "Máy tính bảng mỏng nhẹ với hiệu suất mạnh mẽ",
      "rating": 4.8
    },
    {
      "_id": "p7",
      "name": "Louis Vuitton Neverfull",
      "image_url": "https://example.com/images/lv-neverfull.jpg",
      "category": "bags",
      "price": 38500000,
      "discount_price": null,
      "description": "Túi xách cao cấp với thiết kế rộng rãi và sang trọng",
      "rating": 4.9
    }
  ]
}
```

### 2. Dữ Liệu Mẫu cho `/product-page/{id}`

```json
{
  "product": {
    "_id": "p1",
    "name": "Sony WH-1000XM4",
    "description": "Tai nghe chống ồn không dây cao cấp của Sony với công nghệ khử tiếng ồn hàng đầu trong ngành. Trang bị chip xử lý QN1 mới nhất, cho phép khử tiếng ồn hiệu quả hơn 20% so với thế hệ trước. Thời lượng pin lên đến 30 giờ sử dụng, tính năng sạc nhanh 10 phút cho 5 giờ sử dụng.",
    "image_url": "https://example.com/images/sony-wh1000xm4.jpg",
    "category": "electronics",
    "price": 8500000,
    "discount_price": 7200000,
    "rating": 4.8,
    "specifications": {
      "brand": "Sony",
      "model": "WH-1000XM4",
      "color": "Black",
      "warranty": "24 months",
      "connectivity": "Bluetooth 5.0, 3.5mm jack",
      "battery_life": "30 hours",
      "weight": "254g",
      "features": [
        "Noise Cancellation",
        "Touch Controls",
        "Speak-to-Chat",
        "Multipoint Connection"
      ]
    },
    "stock": 12
  },
  "reviews": [
    {
      "user": "Nguyễn Văn A",
      "review": "Chất lượng âm thanh tuyệt vời, khả năng chống ồn rất ấn tượng. Tôi sử dụng gần như hàng ngày cho công việc và giải trí. Rất hài lòng với sản phẩm này!",
      "sentiment": "positive",
      "date": "2023-11-15",
      "rating": 5
    },
    {
      "user": "Trần Thị B",
      "review": "Tai nghe có chất lượng tốt, nhưng giá hơi cao so với các sản phẩm cùng phân khúc. Chức năng chống ồn hoạt động tốt trong môi trường văn phòng.",
      "sentiment": "neutral",
      "date": "2023-10-22",
      "rating": 4
    },
    {
      "user": "Lê Văn C",
      "review": "Sau 6 tháng sử dụng, phần đệm tai bắt đầu bong tróc. Âm thanh vẫn tốt nhưng độ bền không như kỳ vọng với mức giá này.",
      "sentiment": "negative",
      "date": "2023-09-10",
      "rating": 3
    },
    {
      "user": "Phạm Thị D",
      "review": "Tôi đã dùng qua nhiều loại tai nghe nhưng đây là loại chống ồn tốt nhất! Rất đáng giá với số tiền bỏ ra.",
      "sentiment": "positive",
      "date": "2023-11-02",
      "rating": 5
    }
  ],
  "related_products": [
    {
      "_id": "p4",
      "name": "Apple AirPods Pro",
      "image_url": "https://example.com/images/apple-airpods-pro.jpg",
      "category": "electronics",
      "price": 6200000,
      "discount_price": 5800000,
      "rating": 4.9
    },
    {
      "_id": "p8",
      "name": "Bose QuietComfort 45",
      "image_url": "https://example.com/images/bose-qc45.jpg",
      "category": "electronics",
      "price": 8900000,
      "discount_price": 7900000,
      "rating": 4.7
    },
    {
      "_id": "p9",
      "name": "Sennheiser Momentum 4",
      "image_url": "https://example.com/images/sennheiser-momentum4.jpg",
      "category": "electronics",
      "price": 9200000,
      "discount_price": 8500000,
      "rating": 4.6
    },
    {
      "_id": "p10",
      "name": "Sony WF-1000XM4",
      "image_url": "https://example.com/images/sony-wf1000xm4.jpg",
      "category": "electronics",
      "price": 5800000,
      "discount_price": 5200000,
      "rating": 4.8
    }
  ]
}
```

### 3. Dữ Liệu Mẫu cho `/classify-product`

#### Response:

```json
{
  "category": "shoes",
  "confidence": 0.95,
  "similar_products": [
    {
      "_id": "p2",
      "name": "Nike Air Max 270",
      "image_url": "https://example.com/images/nike-airmax270.jpg",
      "category": "shoes",
      "price": 3600000,
      "rating": 4.6
    },
    {
      "_id": "p5",
      "name": "Adidas Ultraboost 22",
      "image_url": "https://example.com/images/adidas-ultraboost22.jpg",
      "category": "shoes",
      "price": 4200000,
      "rating": 4.7
    },
    {
      "_id": "p11",
      "name": "Puma RS-X",
      "image_url": "https://example.com/images/puma-rsx.jpg",
      "category": "shoes",
      "price": 2800000,
      "rating": 4.3
    }
  ]
}
```

### 4. Dữ Liệu Mẫu cho `/analyze-review`

#### Request:

```json
{
  "review": "Sản phẩm tuyệt vời, tôi rất hài lòng với chất lượng và giá cả. Giao hàng nhanh!"
}
```

#### Response:

```json
{
  "sentiment": "positive",
  "confidence": 0.92,
  "keywords": [
    "tuyệt vời",
    "hài lòng",
    "chất lượng",
    "giá cả",
    "giao hàng nhanh"
  ]
}
```

### 5. Dữ Liệu Mẫu cho `/recommendations/{user_id}`

```json
{
  "recommended_products": [
    {
      "_id": "rec1",
      "name": "Samsung Galaxy Watch 5",
      "image_url": "https://example.com/images/samsung-watch5.jpg",
      "category": "electronics",
      "price": 6800000,
      "discount_price": 5990000,
      "rating": 4.7
    },
    {
      "_id": "rec2",
      "name": "JBL Charge 5",
      "image_url": "https://example.com/images/jbl-charge5.jpg",
      "category": "electronics",
      "price": 3200000,
      "discount_price": 2800000,
      "rating": 4.5
    },
    {
      "_id": "rec3",
      "name": "Canon EOS M50 Mark II",
      "image_url": "https://example.com/images/canon-eosm50ii.jpg",
      "category": "electronics",
      "price": 16500000,
      "discount_price": 15800000,
      "rating": 4.6
    },
    {
      "_id": "rec4",
      "name": "DJI Mini 3 Pro",
      "image_url": "https://example.com/images/dji-mini3pro.jpg",
      "category": "electronics",
      "price": 18900000,
      "discount_price": 17500000,
      "rating": 4.8
    }
  ],
  "user_preferences": ["electronics", "photography", "audio", "wearables"]
}
```

## Hướng Dẫn Đặt Tên

1. **Endpoint**: Sử dụng kebab-case cho URL và resource
2. **Fields**: Sử dụng snake_case cho tên trường trong JSON
3. **ID**: Sử dụng `_id` làm định danh chính cho mỗi resource

## Mã Trạng Thái HTTP

- 200 OK: Request thành công
- 400 Bad Request: Request không hợp lệ
- 401 Unauthorized: Không có quyền truy cập
- 404 Not Found: Resource không tồn tại
- 500 Internal Server Error: Lỗi server

## Ghi Chú Cho Team Backend

- Đảm bảo tất cả API endpoints đều có rate limiting để tránh quá tải
- Implement caching khi phù hợp để giảm thời gian phản hồi
- Đảm bảo validate dữ liệu đầu vào để tránh lỗi và tấn công injection
- Cung cấp thông báo lỗi chi tiết và rõ ràng khi có lỗi xảy ra
