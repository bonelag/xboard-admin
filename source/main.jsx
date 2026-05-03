import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.jsx";
import { I18nProvider } from "./i18n/index.js";
import "./assets/styles/index.css";

function resolveMountPoint() {
    if (typeof document === "undefined") {
        return null;
    }

    return document.getElementById("app") || document.getElementById("root");
}

const mountPoint = resolveMountPoint();

if (mountPoint) {
    createRoot(mountPoint).render(
        <React.StrictMode>
            <I18nProvider>
                <App />
            </I18nProvider>
        </React.StrictMode>,
    );
}
