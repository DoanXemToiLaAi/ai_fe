# AI E-commerce Frontend

Dự án frontend cho ứng dụng e-commerce tích hợp AI, được xây dựng với Next.js, TypeScript và Tailwind CSS.

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Cài đặt](#cài-đặt)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Kết nối với Backend](#kết-nối-với-backend)
- [Kiểm tra API](#kiểm-tra-api)
- [Các tính năng chính](#các-tính-năng-chính)
- [Debug và xử lý lỗi](#debug-và-xử-lý-lỗi)
- [Đóng góp](#đóng-góp)

## 🌟 Tổng quan

Dự án e-commerce AI là một ứng dụng mua sắm trực tuyến tích hợp các công nghệ AI để cung cấp trải nghiệm mua sắm cá nhân hóa. Ứng dụng được xây dựng theo mô hình Backend For Frontend (BFF), trong đó backend cung cấp các API được tối ưu hóa cho từng màn hình cụ thể của frontend.

### Công nghệ sử dụng

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: FastAPI, MongoDB
- **AI**: TensorFlow (phân loại hình ảnh), Hugging Face (phân tích cảm xúc)

## 🚀 Cài đặt

### Yêu cầu

- Node.js 18.0.0 trở lên
- npm hoặc yarn

### Các bước cài đặt

1. Clone repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-ai.git
   cd ecommerce-ai
   Thought for 2 secondsTôi sẽ tạo một file README.md hoàn chỉnh để hướng dẫn cách kiểm tra và sử dụng dự án, đặc biệt là khi backend đã sẵn sàng:

```markdown project="AI E-commerce" file="README.md"
...
```

2. Cài đặt dependencies:

```shellscript
npm install
# hoặc
yarn install
```

3. Tạo file `.env.local` và cấu hình API URL:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Chạy ứng dụng ở môi trường development:

```shellscript
npm run dev
# hoặc
yarn dev
```

5. Truy cập ứng dụng tại [http://localhost:3000](http://localhost:3000)


## 📂 Cấu trúc dự án

```plaintext
ecommerce-ai/
├── app/                    # App Router của Next.js
│   ├── api-test/           # Trang kiểm tra API
│   ├── categories/         # Trang danh mục sản phẩm
│   ├── docs/               # Trang tài liệu API
│   ├── product/            # Trang chi tiết sản phẩm
│   ├── recommendations/    # Trang gợi ý sản phẩm
│   ├── upload/             # Trang tải lên và phân loại ảnh
│   ├── globals.css         # CSS toàn cục
│   ├── layout.tsx          # Layout chính
│   └── page.tsx            # Trang chủ
├── components/             # Các component React
│   ├── ui/                 # UI components (shadcn/ui)
│   ├── api-debug.tsx       # Component debug API
│   ├── api-schema-viewer.tsx # Component xem schema API
│   ├── api-status.tsx      # Component hiển thị trạng thái API
│   └── ...
├── lib/                    # Thư viện và utilities
│   └── utils.ts            # Các hàm tiện ích
├── public/                 # Tài nguyên tĩnh
├── services/               # Các service gọi API
│   └── api.ts              # Service gọi API
├── types/                  # Type definitions
│   └── index.ts            # Các type chính
├── .env.local              # Biến môi trường local
├── next.config.mjs         # Cấu hình Next.js
├── package.json            # Dependencies và scripts
├── tailwind.config.ts      # Cấu hình Tailwind CSS
└── tsconfig.json           # Cấu hình TypeScript
```

## 🔌 Kết nối với Backend

### Cấu hình API URL

Ứng dụng sử dụng biến môi trường `NEXT_PUBLIC_API_URL` để xác định URL của backend API. Mặc định, URL này được đặt là `http://localhost:8000`.

Để thay đổi URL API, bạn có thể:

1. Chỉnh sửa file `.env.local`:

```plaintext
NEXT_PUBLIC_API_URL=http://your-backend-url
```


2. Hoặc khi chạy ứng dụng:

```shellscript
NEXT_PUBLIC_API_URL=http://your-backend-url npm run dev
```




### Kiểm tra kết nối

Sau khi backend đã chạy, bạn có thể kiểm tra kết nối bằng cách:

1. Mở ứng dụng frontend tại [http://localhost:3000](http://localhost:3000)
2. Kiểm tra trạng thái API ở góc dưới bên trái màn hình
3. Hoặc truy cập trang kiểm tra API tại [http://localhost:3000/api-test](http://localhost:3000/api-test)


## 🧪 Kiểm tra API

### Trang kiểm tra API

Ứng dụng cung cấp một trang kiểm tra API tại `/api-test`, cho phép bạn:

1. Kiểm tra trạng thái kết nối với backend
2. Test các endpoint API chính
3. Xem response từ API


### API Debug Tool

Ngoài ra, ứng dụng còn cung cấp một công cụ debug API ở góc dưới bên phải màn hình, cho phép bạn:

1. Test các endpoint API
2. Xem chi tiết request và response
3. Xem lỗi nếu có


### API Schema Viewer

Công cụ API Schema Viewer cho phép bạn:

1. Xem schema của các endpoint API
2. Test các endpoint API
3. Xem response từ API


## 🎯 Các tính năng chính

### 1. Trang chủ

- Hiển thị sản phẩm nổi bật
- Hiển thị sản phẩm được đề xuất
- Hiển thị danh mục sản phẩm


**API sử dụng**: `GET /home`

### 2. Trang chi tiết sản phẩm

- Hiển thị thông tin chi tiết sản phẩm
- Hiển thị đánh giá sản phẩm
- Hiển thị sản phẩm liên quan
- Cho phép người dùng đánh giá sản phẩm


**API sử dụng**:

- `GET /product-page/{id}`
- `POST /analyze-review` (khi đánh giá sản phẩm)


### 3. Trang phân loại ảnh

- Cho phép người dùng tải lên ảnh sản phẩm
- Phân loại ảnh sản phẩm bằng AI
- Hiển thị kết quả phân loại


**API sử dụng**: `POST /classify-product`

### 4. Trang gợi ý sản phẩm

- Hiển thị sản phẩm được đề xuất cá nhân hóa
- Hiển thị sở thích của người dùng


**API sử dụng**: `GET /recommendations/{user_id}`

## 🐞 Debug và xử lý lỗi

### Xử lý lỗi API

Khi gặp lỗi khi gọi API, bạn có thể:

1. Kiểm tra console của trình duyệt để xem chi tiết lỗi
2. Sử dụng API Debug Tool để xem chi tiết request và response
3. Kiểm tra logs của backend


### Các lỗi thường gặp

1. **CORS Error**: Backend chưa cấu hình CORS đúng cách

1. Giải pháp: Cấu hình CORS trong backend để cho phép frontend gọi API



2. **404 Not Found**: Endpoint API không tồn tại

1. Giải pháp: Kiểm tra URL API và endpoint trong backend



3. **500 Internal Server Error**: Lỗi server

1. Giải pháp: Kiểm tra logs của backend



4. **Connection Refused**: Backend chưa chạy hoặc URL API không đúng

1. Giải pháp: Kiểm tra backend đã chạy chưa và URL API đã đúng chưa





### Kiểm tra dữ liệu

Để kiểm tra dữ liệu từ API:

1. Sử dụng API Debug Tool để xem response từ API
2. Kiểm tra console của trình duyệt để xem dữ liệu được log
3. Sử dụng API Schema Viewer để xem schema của API


## 🤝 Đóng góp

Chúng tôi rất hoan nghênh mọi đóng góp cho dự án. Nếu bạn muốn đóng góp, vui lòng:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi của bạn (`git commit -m 'Add some amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request


## 📞 Liên hệ

Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ:

- **Email**: [contact@ai-shop.com](mailto:contact@ai-shop.com)
- **GitHub**: [github.com/your-username/ecommerce-ai](https://github.com/your-username/ecommerce-ai)


## 📋 Mục lục

- [Chuẩn bị](#chuẩn-bị)
- [Kiểm tra kết nối cơ bản](#kiểm-tra-kết-nối-cơ-bản)
- [Kiểm tra từng endpoint](#kiểm-tra-từng-endpoint)
- [Xử lý lỗi thường gặp](#xử-lý-lỗi-thường-gặp)
- [Checklist kiểm tra](#checklist-kiểm-tra)

## 🔧 Chuẩn bị

### Backend

1. Đảm bảo backend đã được chạy và lắng nghe tại cổng mặc định (thường là 8000)
2. Kiểm tra MongoDB đã được kết nối và seeded dữ liệu mẫu
3. Kiểm tra các endpoint API đã được cấu hình đúng cách

### Frontend

1. Đảm bảo biến môi trường `NEXT_PUBLIC_API_URL` đã được cấu hình đúng trong file `.env.local`
2. Chạy ứng dụng frontend với lệnh `npm run dev` hoặc `yarn dev`
3. Truy cập ứng dụng tại [http://localhost:3000](http://localhost:3000)

## 🔄 Kiểm tra kết nối cơ bản

### Sử dụng API Status

1. Mở ứng dụng frontend tại [http://localhost:3000](http://localhost:3000)
2. Kiểm tra trạng thái API ở góc dưới bên trái màn hình
3. Nếu hiển thị "API đang hoạt động", kết nối đã thành công
4. Nếu hiển thị lỗi, xem phần [Xử lý lỗi thường gặp](#xử-lý-lỗi-thường-gặp)

### Sử dụng trang API Test

1. Truy cập trang kiểm tra API tại [http://localhost:3000/api-test](http://localhost:3000/api-test)
2. Nhấn nút "Test tất cả API" để kiểm tra tất cả các endpoint API
3. Kiểm tra kết quả của từng endpoint

## 🧪 Kiểm tra từng endpoint

### 1. Endpoint `/home`

**Mục đích**: Lấy dữ liệu cho trang chủ

**Cách kiểm tra**:
1. Truy cập trang chủ tại [http://localhost:3000](http://localhost:3000)
2. Kiểm tra sản phẩm nổi bật và sản phẩm được đề xuất đã được hiển thị
3. Hoặc sử dụng API Debug Tool để test endpoint `/home`

**Dữ liệu mong đợi**:
```json
{
  "featured_products": [...],
  "recommended_products": [...]
}
```

### 2. Endpoint `/product-page/{id}`

**Mục đích**: Lấy dữ liệu cho trang chi tiết sản phẩm

**Cách kiểm tra**:

1. Truy cập trang chi tiết sản phẩm tại [http://localhost:3000/product/p1](http://localhost:3000/product/p1)
2. Kiểm tra thông tin sản phẩm, đánh giá và sản phẩm liên quan đã được hiển thị
3. Hoặc sử dụng API Debug Tool để test endpoint `/product-page/p1`


**Dữ liệu mong đợi**:

```json
{
  "product": {...},
  "reviews": [...],
  "related_products": [...]
}
```

### 3. Endpoint `/classify-product`

**Mục đích**: Phân loại ảnh sản phẩm

**Cách kiểm tra**:

1. Truy cập trang tải lên ảnh tại [http://localhost:3000/upload](http://localhost:3000/upload)
2. Tải lên một ảnh sản phẩm
3. Kiểm tra kết quả phân loại đã được hiển thị


**Dữ liệu mong đợi**:

```json
{
  "category": "shoes",
  "confidence": 0.95
}
```

### 4. Endpoint `/analyze-review`

**Mục đích**: Phân tích cảm xúc từ đánh giá

**Cách kiểm tra**:

1. Truy cập trang chi tiết sản phẩm tại [http://localhost:3000/product/p1](http://localhost:3000/product/p1)
2. Chuyển đến tab "Viết đánh giá"
3. Nhập đánh giá và gửi
4. Kiểm tra kết quả phân tích cảm xúc đã được hiển thị


**Dữ liệu mong đợi**:

```json
{
  "sentiment": "positive",
  "confidence": 0.92
}
```

### 5. Endpoint `/recommendations/{user_id}`

**Mục đích**: Lấy sản phẩm được đề xuất cá nhân hóa

**Cách kiểm tra**:

1. Truy cập trang gợi ý sản phẩm tại [http://localhost:3000/recommendations/user1](http://localhost:3000/recommendations/user1)
2. Kiểm tra sản phẩm được đề xuất và sở thích của người dùng đã được hiển thị
3. Hoặc sử dụng API Debug Tool để test endpoint `/recommendations/user1`


**Dữ liệu mong đợi**:

```json
{
  "recommended_products": [...],
  "user_preferences": [...]
}
```

## 🐞 Xử lý lỗi thường gặp

### 1. CORS Error

**Lỗi**: `Access to fetch at 'http://localhost:8000/...' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Nguyên nhân**: Backend chưa cấu hình CORS đúng cách

**Giải pháp**:

1. Cấu hình CORS trong backend để cho phép frontend gọi API
2. Thêm middleware CORS trong FastAPI:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 2. 404 Not Found

**Lỗi**: `GET http://localhost:8000/... 404 (Not Found)`

**Nguyên nhân**: Endpoint API không tồn tại

**Giải pháp**:

1. Kiểm tra URL API và endpoint trong backend
2. Kiểm tra router trong FastAPI đã được cấu hình đúng cách
3. Kiểm tra endpoint trong frontend đã được gọi đúng cách


### 3. 500 Internal Server Error

**Lỗi**: `GET http://localhost:8000/... 500 (Internal Server Error)`

**Nguyên nhân**: Lỗi server

**Giải pháp**:

1. Kiểm tra logs của backend
2. Kiểm tra xử lý lỗi trong backend
3. Kiểm tra kết nối với MongoDB


### 4. Connection Refused

**Lỗi**: `Failed to fetch: TypeError: Failed to fetch`

**Nguyên nhân**: Backend chưa chạy hoặc URL API không đúng

**Giải pháp**:

1. Kiểm tra backend đã chạy chưa
2. Kiểm tra URL API đã đúng chưa
3. Kiểm tra cổng backend đã đúng chưa


## ✅ Checklist kiểm tra

Sử dụng checklist sau để đảm bảo tất cả các tính năng đã được kiểm tra:

- Kết nối cơ bản với backend
- Trang chủ hiển thị sản phẩm nổi bật và sản phẩm được đề xuất
- Trang chi tiết sản phẩm hiển thị thông tin sản phẩm, đánh giá và sản phẩm liên quan
- Trang tải lên ảnh phân loại ảnh sản phẩm đúng cách
- Đánh giá sản phẩm được phân tích cảm xúc đúng cách
- Trang gợi ý sản phẩm hiển thị sản phẩm được đề xuất và sở thích của người dùng
- Tất cả các trang hiển thị thông báo lỗi khi API gặp lỗi
- API Debug Tool hiển thị chi tiết request và response
- API Schema Viewer hiển thị schema của API
- API Status hiển thị trạng thái kết nối với backend


## 📝 Ghi chú

- Đảm bảo MongoDB đã được seeded dữ liệu mẫu trước khi kiểm tra
- Nếu bạn thay đổi URL API, đảm bảo cập nhật biến môi trường `NEXT_PUBLIC_API_URL` trong file `.env.local`
- Nếu bạn gặp lỗi, hãy kiểm tra console của trình duyệt và logs của backend


```plaintext

Hai file này sẽ giúp team hiểu rõ cách sử dụng và kiểm tra dự án, đặc biệt là khi backend đã sẵn sàng. File README.md cung cấp tổng quan về dự án và cách cài đặt, trong khi file API_TESTING_GUIDE.md cung cấp hướng dẫn chi tiết về cách kiểm tra kết nối giữa frontend và backend.
```