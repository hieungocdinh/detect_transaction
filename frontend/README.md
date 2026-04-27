# Frontend README

## 1. Mục tiêu

Frontend này được viết bằng React + TypeScript để phục vụ 2 luồng chính:

- CRUD transaction thủ công.
- Mock luồng detect transaction từ ảnh biên lai để chờ ghép backend AI sau.

Frontend đang bám sát contract hiện có của backend:

- API transaction: `/api/v1/transactions`
- Response thành công/thất bại: `BaseResponse`
- Xóa transaction: backend đang trả `void`

## 2. Cấu trúc thư mục

```text
frontend/
|- src/
|  |- components/      # UI co the tai su dung
|  |- constants/       # constant va option dung chung
|  |- lib/             # helper, format, request wrapper
|  |- pages/           # cac man hinh theo route
|  |- services/        # noi goi API/mock service
|  |- types/           # type TypeScript
|  |- App.tsx          # khai bao route
|  |- main.tsx         # diem vao cua app
|  |- styles.css       # style global
|- .env.example
|- package.json
|- tsconfig.json
|- vite.config.ts
|- README.md
```

## 3. Route hiện có

- `/transactions`: danh sách transaction.
- `/transactions/new`: thêm transaction thủ công.
- `/transactions/:transactionId`: xem chi tiết transaction.
- `/transactions/:transactionId/edit`: cập nhật transaction.
- `/detect/upload`: bước 1 upload ảnh.
- `/detect/review`: bước 2 review kết quả detect.

## 4. Cách chạy

```powershell
npm install
npm run dev
```

Build production:

```powershell
npm run build
```

Nếu cần gọi backend khác domain/port khi deploy, tạo file `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Trong lúc dev, `vite.config.ts` đã proxy `/api` sang `http://localhost:8080`.

## 5. Các file quan trọng

### `src/lib/http.ts`

Nơi duy nhất xử lý chung cho `fetch`:

- Đọc `BaseResponse` từ backend.
- Phân biệt success/error dựa vào `status`.
- Ném `ApiError` để page xử lý hiện message.
- Xử lý cả trường hợp delete không có body response.

Rule:

- Không gọi `fetch` trực tiếp trong page.
- Muốn gọi API mới, hãy thêm vào `src/services/` trước.

### `src/services/transactionService.ts`

Chứa toàn bộ hàm CRUD transaction.

Rule:

- Mỗi endpoint mới của transaction nên đi qua file này.
- Page chỉ nên gọi service, không tự build URL API trong page.

### `src/services/detectService.ts`

Hiện tại là mock detect service.

Rule:

- Khi backend detect thật xong, ưu tiên thay logic tại file này.
- Giữ interface dữ liệu draft review ổn định để page detect review không phải đổi nhiều.

### `src/components/TransactionForm.tsx`

Form dùng chung cho:

- thêm giao dịch thủ công
- cập nhật giao dịch
- review kết quả detect

Rule:

- Nếu thêm field mới cho transaction, cập nhật ở đây trước.
- Cố gắng tiếp tục dùng chung form thay vì tạo nhiều form giống nhau.

## 6. Rule để update code sau này

### Tổ chức code

- Page chỉ lo luồng màn hình: load data, submit, navigate, hiện message.
- Component chỉ lo UI và event UI.
- Service chỉ lo giao tiếp API/mock.
- Helper xử lý format/validate để trong `lib/`.
- Type dùng chung để trong `types/`.

### Xử lý API

- Luôn đi qua `request()` trong `src/lib/http.ts`.
- Luôn hiện `message` từ backend nếu backend trả lỗi.
- Không hard-code logic success chỉ dựa vào HTTP status, vì backend còn có `status` trong body.

### Xử lý detect

- Bước upload và review đã tách riêng, không trộn chung vào màn add transaction thủ công.
- Draft detect đang lưu tạm trong `sessionStorage` để tránh mất dữ liệu khi điều hướng trong session.
- Khi backend detect thật có API upload ảnh, chỉ đổi service và giữ UI flow như cũ nếu có thể.

### UI va style

- Ưu tiên tái sử dụng class và component hiện có trước khi thêm mới.
- Giữ style responsive cho mobile.
- Nếu thêm component mới, đặt tên rõ nghĩa và ưu tiên file nhỏ, dễ đọc.

### Form va validation

- Validate cơ bản ở frontend để user có feedback nhanh.
- Vẫn phải tôn trọng message validation từ backend và hiện lại cho user.
- Các field transaction mới cần cập nhật đồng bộ ở `types`, `lib/transaction`, `TransactionForm`, và service nếu payload đổi.

## 7. Hành vi hiện tại của luồng detect

Do backend detect chưa xong, frontend đang mô phỏng như sau:

1. User upload 1 ảnh.
2. Frontend gọi `detectTransactionFromImage()`.
3. Service trả về dữ liệu mock đã prefill vào form.
4. User review và bấm lưu.
5. Frontend gọi API create transaction thật của backend.

Nơi cần sửa sau này sẽ tập trung chủ yếu ở:

- `src/services/detectService.ts`
- có thể thêm API route mới nếu backend đổi contract

## 8. Gợi ý mở rộng tiếp

1. Thêm toast global thay cho banner theo từng page.
2. Thêm filter theo category/date ở màn list.
3. Thêm upload drag and drop đẹp hơn nếu cần.
4. Thêm test cho service và page quan trọng.
