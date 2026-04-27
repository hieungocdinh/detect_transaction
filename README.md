# Detect Transaction

## 1. Tổng quan

Đây là project nhỏ để học và ôn lại cả backend Java Spring Boot và frontend React + TypeScript.

Mục tiêu của project:

- Cho phép người dùng quản lý danh sách transaction.
- Hỗ trợ thêm mới, xem chi tiết, cập nhật, xóa transaction.
- Hỗ trợ luồng upload ảnh biên lai thanh toán.
- Trong tương lai, backend sẽ gửi ảnh sang AI để detect thông tin giao dịch.
- Sau khi detect, người dùng sẽ review lại kết quả rồi mới lưu vào hệ thống.

Hiện trạng hiện tại:

- Backend đã có CRUD transaction và format response chung `BaseResponse`.
- Frontend đã được code đầy đủ cho các màn CRUD.
- Luồng detect đã được dựng sẵn ở frontend theo 2 bước: upload ảnh -> review kết quả.
- Phần detect thật từ AI chưa có, frontend đang dùng mock service để chờ ghép API sau.

## 2. Cấu trúc repo

```text
detect-trasaction/
|- backend/   # Spring Boot service
|- frontend/  # React + TypeScript app
|- README.md
```

Đọc thêm:

- `backend/README.md`: chi tiết backend, API, quy ước code.
- `frontend/README.md`: chi tiết frontend, route, quy ước mở rộng UI.

## 3. Luồng nghiệp vụ

### CRUD thủ công

1. User vào màn danh sách transaction.
2. User có thể thêm mới thủ công.
3. User có thể xem chi tiết, sửa, xóa transaction.

### Luồng detect từ ảnh

1. User vào màn upload ảnh.
2. User chọn 1 ảnh biên lai thanh toán.
3. Frontend gọi detect service.
4. Kết quả detect đổ sẵn vào form review.
5. User kiểm tra, sửa nếu cần.
6. User bấm lưu để tạo transaction mới.

## 4. Cách chạy local

### Backend

Chạy trong thư mục `backend/`:

```powershell
.\mvnw.cmd spring-boot:run
```

Mặc định backend dùng PostgreSQL local:

- DB: `detect-transaction`
- User: `postgres`
- Password: `123456`

### Frontend

Chạy trong thư mục `frontend/`:

```powershell
npm install
npm run dev
```

Frontend dev server mặc định ở `http://localhost:5173` và proxy `/api` sang backend `http://localhost:8080`.

## 5. Nguyên tắc phát triển tiếp

- Ưu tiên code tay, hiểu rõ luồng đi của dữ liệu, không gen code đồng loạt nếu không cần.
- Backend và frontend đều đang được tách khá rõ theo layer, nên giữ cách tổ chức này khi thêm tính năng mới.
- Khi detect API thật sẵn sàng, ưu tiên thay ở 1 điểm duy nhất là service detect ở frontend và controller/service detect ở backend.
- Nếu sau này có thêm tính năng lớn, hãy cập nhật README của từng phần để giữ lại rule và cấu trúc cho nhất quán.

## 6. Gợi ý roadmap tiếp theo

1. Thêm API upload ảnh + detect thông tin giao dịch ở backend.
2. Thêm module lưu file tạm hoặc dùng storage/cloud storage nếu cần.
3. Bổ sung phần auth nếu muốn tách dữ liệu theo user.
4. Bổ sung test cho frontend và backend.
5. Có thể thêm filter/sort/pagination cho màn danh sách transaction.
