import { useSyncExternalStore } from "react";
import { authStorage } from "../utils/storage.js";

const ACCESS_TOKEN_KEY = "access_token";

const listeners = new Set();

const state = {
    token: authStorage.get(ACCESS_TOKEN_KEY, ""),
    userInfo: null,
    isLoggedIn: Boolean(authStorage.get(ACCESS_TOKEN_KEY, "")),
    loading: false,
    error: null,
};

function emit() {
    listeners.forEach((listener) => listener());
}

export function getAuthState() {
    return {
        ...state,
    };
}

export function subscribeAuth(listener) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export function useAuthState(selector = (snapshot) => snapshot) {
    return useSyncExternalStore(
        subscribeAuth,
        () => selector(getAuthState()),
        () => selector(getAuthState()),
    );
}

export function setAuthToken(token) {
    const value = token ? String(token) : "";
    state.token = value;
    state.isLoggedIn = Boolean(value);

    if (value) {
        authStorage.set(ACCESS_TOKEN_KEY, value);
    } else {
        authStorage.remove(ACCESS_TOKEN_KEY);
    }

    emit();
    return value;
}

export function setUserInfo(userInfo) {
    state.userInfo = userInfo ?? null;
    emit();
    return state.userInfo;
}

export function setAuthLoading(loading) {
    state.loading = Boolean(loading);
    emit();
}

export function setAuthError(error) {
    state.error = error || null;
    emit();
}

export function clearAuthSession() {
    authStorage.remove(ACCESS_TOKEN_KEY);
    state.token = "";
    state.userInfo = null;
    state.isLoggedIn = false;
    state.loading = false;
    state.error = null;
    emit();
}
