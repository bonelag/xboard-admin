export default {
    auth: {
        signIn: {
            title: "Đăng nhập",
            description: "Nhập email và mật khẩu để đăng nhập",
            email: "Email",
            emailPlaceholder: "name@example.com",
            password: "Mật khẩu",
            passwordPlaceholder: "Nhập mật khẩu của bạn",
            forgotPassword: "Quên mật khẩu?",
            submit: "Đăng nhập",
            rememberMe: "Ghi nhớ tôi",
            resetPassword: {
                title: "Đặt lại mật khẩu",
                description: "Chạy lệnh sau trong thư mục gốc của trang web để đặt lại mật khẩu",
                command: "php artisan reset:password admin-email",
            },
            validation: {
                emailRequired: "Vui lòng nhập địa chỉ email",
                emailInvalid: "Vui lòng nhập địa chỉ email hợp lệ",
                passwordRequired: "Vui lòng nhập mật khẩu",
                passwordLength: "Mật khẩu phải có ít nhất 7 ký tự",
            },
        },
    },
    common: {
        copy: {
            success: "Đã sao chép thành công",
        },
        saving: "Đang lưu...",
        logout: "Đăng xuất",
        settings: "Cài đặt",
        defaultEmail: "administrator@example.com",
        http: {
            notLoggedIn: "Bạn chưa đăng nhập",
            loginExpired: "Phiên đăng nhập đã hết hạn",
            noPermission: "Bạn không có quyền truy cập",
            notFound: "Không tìm thấy",
            unknownError: "Lỗi không xác định",
            unknownException: "Đã xảy ra ngoại lệ không xác định",
        },
    },
};
