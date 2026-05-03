import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar.jsx";
import { useDocumentTitle } from "../../composables/useDocumentTitle.js";
import { useHashLocation } from "../../composables/useHashLocation.js";
import { DashboardView } from "./DashboardView.jsx";

export function HomeView() {
    const title = globalThis.window?.settings?.title || "XBoard";
    const location = useHashLocation();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    useDocumentTitle(title);

    useEffect(() => {
        document.body.classList.toggle("admin-mobile-sidebar-open", mobileSidebarOpen);
        return () => document.body.classList.remove("admin-mobile-sidebar-open");
    }, [mobileSidebarOpen]);

    return (
        <div className="app-shell min-h-svh bg-background text-foreground" data-sidebar-collapsed={sidebarCollapsed} data-mobile-sidebar-open={mobileSidebarOpen}>
            <Sidebar collapsed={sidebarCollapsed} onToggleCollapsed={() => setSidebarCollapsed((value) => !value)} onMobileOpenChange={setMobileSidebarOpen} />
            <main className="admin-shell-main min-h-svh">
                {location.pathname === "/" ? <DashboardView /> : null}
            </main>
        </div>
    );
}
