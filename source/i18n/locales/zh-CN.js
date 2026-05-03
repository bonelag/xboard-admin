export default {
    auth: {
        signIn: {
            title: "登录",
            description: "请输入您的邮箱和密码登录系统",
            email: "邮箱地址",
            emailPlaceholder: "name@example.com",
            password: "密码",
            passwordPlaceholder: "请输入密码",
            forgotPassword: "忘记密码？",
            submit: "登录",
            rememberMe: "记住我",
            resetPassword: {
                title: "重置密码",
                description: "在站点目录下执行以下命令找回密码",
                command: "php artisan reset:password 管理员邮箱",
            },
            validation: {
                emailRequired: "请输入邮箱地址",
                emailInvalid: "邮箱地址格式不正确",
                passwordRequired: "请输入密码",
                passwordLength: "密码长度至少为7个字符",
            },
        },
    },
    common: {
        copy: {
            success: "复制成功",
        },
        saving: "保存中...",
        logout: "退出登录",
        settings: "设置",
        defaultEmail: "administrator@example.com",
        http: {
            notLoggedIn: "您尚未登录",
            loginExpired: "登录已过期",
            noPermission: "没有权限",
            notFound: "未找到",
            unknownError: "未知错误",
            unknownException: "发生未知异常",
        },
    },
};
