import { requestJson } from "./http.js";

export function fetchDashboardStats(token) {
    return requestJson("/stat/getStats", { token });
}

export function fetchOrderStats(params = {}, token) {
    const search = new URLSearchParams(params).toString();
    return requestJson(`/stat/getOrder${search ? `?${search}` : ""}`, { token });
}

export function fetchTrafficRank(params = {}, token) {
    const search = new URLSearchParams(params).toString();
    return requestJson(`/stat/getTrafficRank${search ? `?${search}` : ""}`, { token });
}

export function fetchQueueStats(token) {
    return requestJson("/system/getQueueStats", { token });
}
