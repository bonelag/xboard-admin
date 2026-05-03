function getBaseUrl() {
    const baseUrl = globalThis.window?.settings?.base_url || "/";
    return baseUrl.endsWith("/") ? `${baseUrl}api/v2` : `${baseUrl}/api/v2`;
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

    const response = await fetch(`${getBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`, {
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
