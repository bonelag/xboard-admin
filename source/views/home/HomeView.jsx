import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar.jsx";
import { useDocumentTitle } from "../../composables/useDocumentTitle.js";
import { useHashLocation } from "../../composables/useHashLocation.js";
import { DashboardView } from "./DashboardView.jsx";

const SIDEBAR_COLLAPSED_KEY = "collapsed-sidebar";

function readSidebarCollapsed() {
    if (typeof window === "undefined") {
        return false;
    }

    try {
        return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
    } catch {
        return false;
    }
}

function writeSidebarCollapsed(value) {
    try {
        window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(value));
    } catch {
        // Ignore storage failures; sidebar still works for current session.
    }
}

export function HomeView() {
    const title = globalThis.window?.settings?.title || "XBoard";
    const location = useHashLocation();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(readSidebarCollapsed);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    useDocumentTitle(title);

    useEffect(() => {
        document.body.classList.toggle("admin-mobile-sidebar-open", mobileSidebarOpen);
        return () => document.body.classList.remove("admin-mobile-sidebar-open");
    }, [mobileSidebarOpen]);

    return (
        <div className="app-shell min-h-svh bg-background text-foreground" data-sidebar-collapsed={sidebarCollapsed} data-mobile-sidebar-open={mobileSidebarOpen}>
            <Sidebar collapsed={sidebarCollapsed} onToggleCollapsed={() => setSidebarCollapsed((value) => {
                const nextValue = !value;
                writeSidebarCollapsed(nextValue);
                return nextValue;
            })} onMobileOpenChange={setMobileSidebarOpen} />
            <main className="admin-shell-main min-h-svh">
                {location.pathname === "/" ? <DashboardView /> : null}
            </main>
        </div>
    );
}
