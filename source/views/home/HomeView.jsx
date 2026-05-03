import React from "react";
import { Button } from "../../components/Button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/Card.jsx";
import { useDocumentTitle } from "../../composables/useDocumentTitle.js";
import { navigate } from "../../router/index.js";
import { clearAuthSession, useAuthState } from "../../store/auth.js";
import { useTranslation } from "../../i18n/index.js";

export function HomeView() {
    const { t } = useTranslation("common");
    const auth = useAuthState((snapshot) => ({
        token: snapshot.token,
        userInfo: snapshot.userInfo,
        isLoggedIn: snapshot.isLoggedIn,
    }));
    const title = globalThis.window?.settings?.title || "XBoard";

    useDocumentTitle(title);

    return (
        <div className="container flex min-h-svh items-center justify-center px-4 py-8">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{auth.userInfo?.email || t("defaultEmail")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        This source tree starts with the restored sign-in flow. The remaining admin routes can be rebuilt
                        incrementally from the same bundle.
                    </p>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            clearAuthSession();
                            navigate("/sign-in", { replace: true });
                        }}
                    >
                        {t("logout")}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
