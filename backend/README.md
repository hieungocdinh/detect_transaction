# Backend README

## 1. Mục tiêu hiện tại

Backend này là 1 Spring Boot service cho project Detect Transaction.

Hiện tại đã có:

- CRUD transaction.
- DTO request/response.
- `BaseResponse` để đồng nhất format response.
- Validation request.
- Global exception handler.
- Một số scheduler và config liên quan đến cron/notification.

Chưa có:

- API detect transaction từ ảnh.
- Test profile riêng cho datasource.
- Luồng upload file/image.

## 2. Cấu trúc thư mục chính

```text
backend/
|- src/main/java/com/hieudinh/detecttransaction/
|  |- common/        # BaseResponse
|  |- config/        # scheduler config
|  |- controller/    # REST controller
|  |- dto/           # request/response DTO
|  |- entity/        # JPA entity
|  |- enums/         # enum dung chung
|  |- exception/     # custom exception + handler
|  |- mapper/        # MapStruct mapper
|  |- repository/    # JPA repository
|  |- scheduler/     # scheduler jobs
|  |- service/       # business logic
|  |- DetectTransactionApplication.java
|- src/main/resources/application.properties
|- pom.xml
|- README.md
```

## 3. Cách chạy local

Chạy tất cả command trong thư mục `backend/`:

```powershell
.\mvnw.cmd spring-boot:run
```

Run test:

```powershell
.\mvnw.cmd test
```

Datasource mặc định hiện tại:

- URL: `jdbc:postgresql://localhost:5432/detect-transaction`
- username: `postgres`
- password: `123456`

Lưu ý:

- Hiện tại `@SpringBootTest` đang dùng datasource thật.
- Chưa có test profile riêng hoặc embedded database.

## 4. Transaction API hiện có

Base path:

```text
/api/v1/transactions
```

Endpoints:

- `GET /api/v1/transactions`: lấy danh sách.
- `GET /api/v1/transactions/{transaction-id}`: lấy chi tiết.
- `POST /api/v1/transactions`: tạo mới.
- `PUT /api/v1/transactions/{transaction-id}`: cập nhật.
- `DELETE /api/v1/transactions/{transaction-id}`: xóa.

## 5. Format response

Phần lớn API trả về:

```json
{
  "status": "SUCCESS",
  "message": "OK",
  "data": {},
  "meta": null
}
```

Khi lỗi:

```json
{
  "status": "ERROR",
  "message": "Nội dung lỗi",
  "data": null,
  "meta": null
}
```

Lưu ý quan trọng:

- Enum `BaseResponseStatus` trên JSON hiện tại sẽ serialize theo tên enum (`SUCCESS`, `ERROR`), không phải `label` (`success`, `error`).
- Endpoint delete hiện tại trả `void`, frontend đã xử lý trường hợp body rỗng.

## 6. Entity transaction hiện có

Field chính:

- `id: UUID`
- `title: String`
- `amount: Float`
- `category: TransactionCategory`
- `date: LocalDate`
- `createdAt: Instant`
- `updatedAt: Instant`

Base entity đang có thêm:

- `deleted`
- `deletedAt`

Nhưng hiện tại `deleteTransaction()` vẫn đang xóa bằng `repository.delete(...)`, chưa là soft delete đầy đủ trong luồng CRUD.

## 7. Rule để update code sau này

### Controller

- Controller nên giữ mỏng, chủ yếu nhận request và gọi service.
- Không đưa business logic phức tạp vào controller.
- Nếu thêm detect API, tạo controller riêng thay vì nhồi vào transaction controller nếu logic khác biệt rõ.

### DTO

- Request/response của API nên thông qua DTO.
- Đặt validation annotation ở DTO request.
- Nếu field transaction đổi, cập nhật DTO trước rồi mới cập nhật mapper/service.

### Service

- Business logic đặt trong service.
- Service là nơi gom validation nghiệp vụ, xử lý detect, mapping, và gọi repository.
- Nếu detect API có nhiều bước, tách thành service riêng, không để transaction service phình quá lớn.

### Repository

- Repository chỉ nên lo query database.
- Không đưa business rule vào repository.
- Nếu cần soft delete thật sự, xem lại thiết kế delete hiện tại và các query đọc dữ liệu.

### Mapper

- Đang dùng MapStruct để map DTO <-> entity.
- Không sửa file generated trong `target/generated-sources/annotations/`.
- Nếu thêm field mới, cập nhật interface mapper và để build sinh lại code.

### Exception và response

- Lỗi nên đi qua `GlobalExceptionHandler` để frontend nhận message nhất quán.
- Ưu tiên trả message rõ nghĩa cho user/developer.
- Nếu sau này muốn đồng bộ hơn nữa, có thể cân nhắc cho cả delete trả `BaseResponse` thay vì `void`.

## 8. Gợi ý cho tính năng detect transaction từ ảnh

Khi làm tiếp backend detect, nên cân nhắc tách theo hướng:

- `controller`: endpoint upload ảnh và endpoint detect.
- `service`: nhận file, gọi Gemini, parse response.
- `dto`: request/response riêng cho detect.
- `mapper`: nếu cần map detect result về transaction draft.

Gợi ý flow:

1. FE upload 1 ảnh.
2. Backend nhận `MultipartFile`.
3. Backend gọi AI provider.
4. Backend chuẩn hóa dữ liệu detect về 1 DTO draft transaction.
5. FE nhận draft, cho user review, rồi mới gọi API create transaction.

## 9. Điểm cần cải thiện sau này

1. Thêm CORS config hoặc giữ mô hình proxy khi dev.
2. Thêm test profile riêng cho database.
3. Làm rõ soft delete nếu muốn dùng scheduler cleanup.
4. Thêm detect module/doc cho AI integration.
5. Bổ sung logging thay cho `printStackTrace()`.
