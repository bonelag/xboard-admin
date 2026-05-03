export default {
    auth: {
        signIn: {
            title: "Sign In",
            description: "Enter your email and password to sign in",
            email: "Email",
            emailPlaceholder: "name@example.com",
            password: "Password",
            passwordPlaceholder: "Enter your password",
            forgotPassword: "Forgot Password?",
            submit: "Sign In",
            rememberMe: "Remember me",
            resetPassword: {
                title: "Reset Password",
                description: "Execute the following command in the site directory to reset your password",
                command: "php artisan reset:password admin-email",
            },
            validation: {
                emailRequired: "Please enter your email address",
                emailInvalid: "Please enter a valid email address",
                passwordRequired: "Please enter your password",
                passwordLength: "Password must be at least 7 characters",
            },
        },
    },
    common: {
        copy: {
            success: "Copied successfully",
        },
        saving: "Saving...",
        logout: "Sign out",
        settings: "Settings",
        defaultEmail: "administrator@example.com",
        http: {
            notLoggedIn: "You are not logged in",
            loginExpired: "Your session has expired",
            noPermission: "You do not have permission",
            notFound: "Not found",
            unknownError: "Unknown error",
            unknownException: "An unknown exception occurred",
        },
    },
};
