import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "../../i18n/index.js";
import { getSettings, saveSettings } from "../../api/config.js";
import { useAuthState } from "../../store/auth.js";
import { Input } from "../../components/Input.jsx";
import { Button } from "../../components/Button.jsx";
import { Switch } from "../../components/Switch.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/Select.jsx";

const DEFAULTS = {
    frontend_theme: "", frontend_theme_sidebar: "",
    frontend_theme_header: "", frontend_theme_color: "",
    frontend_background_url: "",
};

export function FrontendSettings() {
    const { t } = useTranslation("settings");
    const auth = useAuthState();
    const [values, setValues] = useState(DEFAULTS);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        getSettings("frontend", auth.token).then((res) => {
            const fe = res?.data?.frontend || res?.data || {};
            setValues({ ...DEFAULTS, ...fe });
            setReady(true);
        }).catch(() => setReady(true));
    }, [auth.token]);

    const setField = useCallback((name, value) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            const res = await saveSettings(values, auth.token);
            if (res?.data) {
                // success
            }
        } catch {}
    }, [values, auth.token]);

    if (!ready) return null;

    return (
        <div>
            <h3 className="text-lg font-medium">Cá nhân hóa giao diện</h3>
            <p className="text-sm text-muted-foreground">Tùy chỉnh giao diện hệ thống, bao gồm theme, layout, màu sắc, hình nền.</p>
            <hr className="my-6" />
            <form onSubmit={handleSubmit} className="space-y-8">
                <ToggleField label="Kiểu sidebar" description="Kiểu sidebar" checked={Boolean(values.frontend_theme_sidebar)} onChange={(v) => setField("frontend_theme_sidebar", v ? "dark" : "")} />
                <ToggleField label="Kiểu header" description="Kiểu header" checked={Boolean(values.frontend_theme_header)} onChange={(v) => setField("frontend_theme_header", v ? "dark" : "")} />
                <div className="space-y-1.5">
                    <div className="text-base font-medium">Màu chủ đề</div>
                    <Select value={values.frontend_theme_color || "default"} onValueChange={(v) => setField("frontend_theme_color", v === "default" ? "" : v)}>
                        <SelectTrigger><SelectValue placeholder="Mặc định" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Mặc định</SelectItem>
                            <SelectItem value="black">Đen</SelectItem>
                            <SelectItem value="blackblue">Xanh đen</SelectItem>
                            <SelectItem value="green">Xanh sữa</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">Màu chủ đề</p>
                </div>
                <div className="space-y-1.5">
                    <div className="text-base font-medium">Hình nền</div>
                    <Input placeholder="Nhập URL ảnh" value={values.frontend_background_url ?? ""} onChange={(e) => setField("frontend_background_url", e.target.value)} />
                    <p className="text-sm text-muted-foreground">Hiển thị trên trang đăng nhập backend.</p>
                </div>
                <Button type="submit">Lưu cài đặt</Button>
            </form>
        </div>
    );
}

function ToggleField({ label, description, checked, onChange }) {
    return (
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
                <div className="text-base font-medium">{label}</div>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            <Switch checked={checked} onCheckedChange={onChange} />
        </div>
    );
}
