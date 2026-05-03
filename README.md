# XBoard Admin - Source Code Reconstruction

Dự án này nhằm mục đích tái tạo lại (reverse engineering) mã nguồn Frontend của trang quản trị **XBoard Admin** dựa trên thư mục mã nguồn đã bị minify. Mã nguồn được viết bằng **React**, cấu hình build bằng **Vite**, sử dụng Hash Routing và quản lý state thông qua `useSyncExternalStore`.

## 📌 Tổng quan dự án

- **Mục tiêu**: Phục hồi source code từ file minified ban đầu thành source code React có thể đọc, sửa chữa và mở rộng được.
- **Tiến độ**: Hiện đã hoàn thành luồng Đăng nhập (Auth Flow), thiết lập thành công Base Router, Quản lý State (Store) và Đa ngôn ngữ (i18n). Tiến độ chi tiết được theo dõi tại file [`api.md`](./api.md).
- **Công cụ build**: Sử dụng Vite (có custom cấu hình esbuild để hỗ trợ JSX trong file `.js`) giúp xuất ra thư mục `dist` với cấu trúc **giống hệt 100%** với cấu trúc của thư mục `minify` gốc.

## 📂 Cấu trúc thư mục

```text
xboard-admin/
│
├── source/                 # Thư mục mã nguồn React đang được tái tạo
│   ├── components/         # Các thành phần UI dùng chung (Button, Card,...)
│   ├── composables/        # Các custom hooks (useHashLocation, useAuthGuard)
│   ├── i18n/               # Cấu hình đa ngôn ngữ (vi-VN, en-US, zh-CN)
│   ├── router/             # Cấu hình Hash Router tự xây dựng
│   ├── store/              # Quản lý state toàn cục (Auth)
│   ├── utils/              # Các hàm tiện ích hỗ trợ (Query, Storage,...)
│   ├── views/              # Các trang giao diện (Auth, Home,...)
│   ├── app.jsx             # Entry component của React
│   ├── index.html          # File HTML gốc của Vite
│   └── vite.config.js      # Cấu hình build Vite
│
├── dist/                   # Thư mục chứa code đã compile (kết quả sau khi build)
├── minify/                 # Thư mục chứa code minified nguyên gốc dùng để tham chiếu
├── api.md                  # Checklist tiến độ tái tạo Router & API Endpoints
└── build.bat               # Script tự động hóa toàn bộ quy trình build
```

## 🚀 Hướng dẫn cài đặt và Build

Dự án có sẵn script `build.bat` để tự động hóa mọi thao tác từ cài đặt đến khi build ra file tĩnh phục vụ production.

### 1. Build Source ra cấu trúc Minify
Nhấn đúp chuột vào file `build.bat` hoặc chạy lệnh sau trong Terminal tại thư mục gốc của dự án:
```bash
.\build.bat
```
Script này sẽ thực hiện:
- Cài đặt các package NPM cần thiết (nếu chưa có).
- Chạy `vite build` để đóng gói toàn bộ React app thành file JS, CSS.
- Sao chép các file `locales` đa ngôn ngữ sang `dist`.
- Xóa bỏ các thư mục thừa của Vite để đảm bảo kết quả `dist` hoàn toàn khớp với phiên bản minify trên server thực tế.

### 2. Preview sản phẩm (Chạy thử)
Sau khi script build hoàn tất, Terminal sẽ nhắc bạn chạy lệnh:
```bash
npx serve dist
```
Truy cập vào `http://localhost:3000` để xem kết quả trang Admin. Giao diện Đăng nhập đã có thể dùng được ngay lập tức.

## 🛠 Đặc tả kỹ thuật (Technical Details)

1. **Routing**: Sử dụng cơ chế `window.location.hash` kết hợp với `useSyncExternalStore` để lắng nghe thay đổi URL thay vì dùng thư viện bên thứ 3 (như react-router).
2. **Bảo mật Component**: Bọc các trang yêu cầu đăng nhập bởi `useAuthGuard` để tự động kiểm tra token từ LocalStorage và redirect.
3. **JSX Configuration**: Vite mặc định không cho phép parse JSX bên trong file có đuôi `.js`. Dự án đã được tinh chỉnh lại `esbuild` config để xử lý mượt mà vấn đề này.
4. **Base URL**: Sử dụng `base: './'` trong Vite để mọi file tĩnh (assets) gọi lẫn nhau bằng đường dẫn tương đối, đảm bảo dự án chạy ổn định trên mọi sub-path server mà không bị lỗi 404.

## 🎯 Đóng góp / Hướng phát triển
Để tiếp tục tái tạo các màn hình khác (như Quản lý Order, Server, User, Plugin,...), vui lòng:
1. Mở file mã nguồn gốc trong `minify/` để dò tìm Logic và UI gốc.
2. Code các Component tương ứng tại `source/views/`.
3. Khai báo Path trong `source/router/index.js` và cập nhật tiến độ vào `api.md`.
4. Chạy lại `build.bat` để kiểm tra.