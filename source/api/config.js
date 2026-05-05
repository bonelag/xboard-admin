import { requestJson } from "./http.js";

export function getSettings(key, token) {
    return requestJson(`/config/fetch?key=${encodeURIComponent(key)}`, { token });
}

export function saveSettings(settings, token) {
    return requestJson("/config/save", { method: "POST", body: settings, token });
}

export function getEmailTemplate(token) {
    return requestJson("/config/getEmailTemplate", { token });
}

export function sendTestMail(token) {
    return requestJson("/config/testSendMail", { method: "POST", token });
}

export function setTelegramWebhook(token) {
    return requestJson("/config/setTelegramWebhook", { method: "POST", token });
}
