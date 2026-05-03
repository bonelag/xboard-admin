function getBaseUrl() {
    const baseUrl = globalThis.window?.settings?.base_url || "/";
    return baseUrl.endsWith("/") ? `${baseUrl}api/v2` : `${baseUrl}/api/v2`;
}

function getSecurePath() {
    const securePath = globalThis.window?.settings?.secure_path || "";
    return securePath ? `/${securePath.replace(/^\/+|\/+$/g, "")}` : "";
}

function normalizeHeaders(headers) {
    const contentLanguage =
        (typeof window !== "undefined" && window.localStorage.getItem("i18nextLng")) || "vi-VN";

    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Content-Language": contentLanguage,
        ...headers,
    };
}

function toJsonBody(body) {
    if (body === undefined || body === null) {
        return undefined;
    }

    if (body instanceof FormData || body instanceof URLSearchParams || typeof body === "string") {
        return body;
    }

    return JSON.stringify(body);
}

export class HttpError extends Error {
    constructor(message, status = 500, payload = null) {
        super(message);
        this.name = "HttpError";
        this.status = status;
        this.payload = payload;
    }
}

export async function requestJson(path, options = {}) {
    const {
        method = "GET",
        body,
        token,
        headers = {},
        timeoutMs = 30000,
    } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const nextHeaders = normalizeHeaders(headers);

    if (token) {
        nextHeaders.Authorization = token;
    }

    const publicPaths = ["/passport/auth/login", "/passport/auth/token2Login", "/passport/auth/register", "/guest/comm/config", "/passport/comm/sendEmailVerify", "/passport/auth/forget", "/user/info"];
    const nextPath = path.startsWith("/") ? path : `/${path}`;
    const prefix = publicPaths.includes(nextPath.split("?")[0]) ? "" : getSecurePath();

    const response = await fetch(`${getBaseUrl()}${prefix}${nextPath}`, {
        method,
        headers: nextHeaders,
        body: toJsonBody(body),
        signal: controller.signal,
        credentials: "same-origin",
    }).finally(() => clearTimeout(timeoutId));

    const rawText = await response.text();
    let payload = {};

    if (rawText) {
        try {
            payload = JSON.parse(rawText);
        } catch {
            payload = rawText;
        }
    }

    if (!response.ok) {
        const message =
            (payload && typeof payload === "object" && payload.message) ||
            response.statusText ||
            "Request failed";

        throw new HttpError(message, response.status, payload);
    }

    return payload;
}
