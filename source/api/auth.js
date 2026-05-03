import { requestJson } from "./http.js";

export async function signIn(credentials) {
    return requestJson("/passport/auth/login", {
        method: "POST",
        body: credentials,
    });
}

export async function fetchUserInfo(token) {
    return requestJson("/user/info", {
        method: "GET",
        token,
    });
}

export function extractAuthToken(response) {
    return (
        response?.data?.auth_data ||
        response?.data?.token ||
        response?.auth_data ||
        response?.token ||
        ""
    );
}

export function extractUserInfo(response) {
    return response?.data ?? response ?? null;
}
