const fs = require('fs');

const rawPaths = [
"/", "/404", "/500", "/503", "/config/getEmailTemplate", "/config/knowledge", "/config/notice",
"/config/payment", "/config/plugin", "/config/save", "/config/setTelegramWebhook", "/config/system",
"/config/system/app", "/config/system/email", "/config/system/invite", "/config/system/safe",
"/config/system/server", "/config/system/subscribe", "/config/system/subscribe-template",
"/config/system/telegram", "/config/testSendMail", "/config/theme", "/coupon/drop", "/coupon/fetch",
"/coupon/generate", "/coupon/update", "/finance/coupon", "/finance/gift-card", "/finance/order",
"/finance/plan", "/forgot-password", "/gift-card/codes", "/gift-card/create-template",
"/gift-card/delete-template", "/gift-card/generate-codes", "/gift-card/statistics",
"/gift-card/templates", "/gift-card/toggle-code", "/gift-card/update-template", "/gift-card/usages",
"/guest/comm/config", "/knowledge/drop", "/knowledge/fetch", "/knowledge/save", "/knowledge/show",
"/knowledge/sort", "/order/assign", "/order/cancel", "/order/detail", "/order/fetch", "/order/paid",
"/order/update", "/otp", "/passport/auth/forget", "/passport/auth/login", "/passport/auth/register",
"/passport/auth/token2Login", "/passport/comm/sendEmailVerify", "/payment/drop", "/payment/fetch",
"/payment/getPaymentForm", "/payment/getPaymentMethods", "/payment/save", "/payment/show",
"/payment/sort", "/plan/drop", "/plan/fetch", "/plan/save", "/plan/sort", "/plan/update",
"/plugin/traffic-analytics/records/delete", "/plugin/traffic-analytics/records/fetch",
"/plugin/traffic-analytics/records/save", "/server/group", "/server/group/drop", "/server/group/fetch",
"/server/group/save", "/server/machine", "/server/machine/drop", "/server/machine/fetch",
"/server/machine/getToken", "/server/machine/history", "/server/machine/installCommand",
"/server/machine/nodes", "/server/machine/resetToken", "/server/machine/save", "/server/manage",
"/server/manage/batchDelete", "/server/manage/batchResetTraffic", "/server/manage/batchUpdate",
"/server/manage/copy", "/server/manage/drop", "/server/manage/generateEchKey", "/server/manage/getNodes",
"/server/manage/resetTraffic", "/server/manage/save", "/server/manage/sort", "/server/manage/update",
"/server/route", "/server/route/drop", "/server/route/fetch", "/server/route/save", "/settings",
"/sign-in", "/sign-in-2", "/sign-up", "/stat/getOrder", "/stat/getStats", "/stat/getTrafficRank",
"/theme/delete", "/theme/getThemeConfig", "/theme/getThemes", "/theme/saveThemeConfig", "/theme/upload",
"/ticket/close", "/ticket/fetch", "/ticket/reply", "/user/info", "/user/manage", "/user/ticket"
];

let md = "# Danh sách TẤT CẢ Path & API Admin (Đầy đủ nhất)\n\n";
md += "Dưới đây là danh sách toàn bộ các Path và API Endpoints được trích xuất trực tiếp từ mã nguồn minified.\n\n";

const groups = {
    "Frontend Router Paths (Auth & Basic)": ["/", "/404", "/500", "/503", "/sign-in", "/sign-in-2", "/sign-up", "/forgot-password", "/otp", "/settings"],
    "Frontend Router Paths (Quản lý)": ["/finance/coupon", "/finance/gift-card", "/finance/order", "/finance/plan", "/server/group", "/server/machine", "/server/manage", "/server/route", "/user/manage", "/user/ticket", "/config/knowledge", "/config/notice", "/config/payment", "/config/plugin", "/config/system", "/config/theme"],
    "API Endpoints - Passport (Auth)": ["/passport/auth/forget", "/passport/auth/login", "/passport/auth/register", "/passport/auth/token2Login", "/passport/comm/sendEmailVerify", "/guest/comm/config"],
    "API Endpoints - Config": ["/config/getEmailTemplate", "/config/save", "/config/setTelegramWebhook", "/config/system/app", "/config/system/email", "/config/system/invite", "/config/system/safe", "/config/system/server", "/config/system/subscribe", "/config/system/subscribe-template", "/config/system/telegram", "/config/testSendMail"],
    "API Endpoints - Coupon": ["/coupon/drop", "/coupon/fetch", "/coupon/generate", "/coupon/update"],
    "API Endpoints - Gift Card": ["/gift-card/codes", "/gift-card/create-template", "/gift-card/delete-template", "/gift-card/generate-codes", "/gift-card/statistics", "/gift-card/templates", "/gift-card/toggle-code", "/gift-card/update-template", "/gift-card/usages"],
    "API Endpoints - Knowledge": ["/knowledge/drop", "/knowledge/fetch", "/knowledge/save", "/knowledge/show", "/knowledge/sort"],
    "API Endpoints - Order": ["/order/assign", "/order/cancel", "/order/detail", "/order/fetch", "/order/paid", "/order/update"],
    "API Endpoints - Payment": ["/payment/drop", "/payment/fetch", "/payment/getPaymentForm", "/payment/getPaymentMethods", "/payment/save", "/payment/show", "/payment/sort"],
    "API Endpoints - Plan": ["/plan/drop", "/plan/fetch", "/plan/save", "/plan/sort", "/plan/update"],
    "API Endpoints - Plugin (Traffic Analytics)": ["/plugin/traffic-analytics/records/delete", "/plugin/traffic-analytics/records/fetch", "/plugin/traffic-analytics/records/save"],
    "API Endpoints - Server Group": ["/server/group/drop", "/server/group/fetch", "/server/group/save"],
    "API Endpoints - Server Machine": ["/server/machine/drop", "/server/machine/fetch", "/server/machine/getToken", "/server/machine/history", "/server/machine/installCommand", "/server/machine/nodes", "/server/machine/resetToken", "/server/machine/save"],
    "API Endpoints - Server Manage": ["/server/manage/batchDelete", "/server/manage/batchResetTraffic", "/server/manage/batchUpdate", "/server/manage/copy", "/server/manage/drop", "/server/manage/generateEchKey", "/server/manage/getNodes", "/server/manage/resetTraffic", "/server/manage/save", "/server/manage/sort", "/server/manage/update"],
    "API Endpoints - Server Route": ["/server/route/drop", "/server/route/fetch", "/server/route/save"],
    "API Endpoints - Stat": ["/stat/getOrder", "/stat/getStats", "/stat/getTrafficRank"],
    "API Endpoints - Theme": ["/theme/delete", "/theme/getThemeConfig", "/theme/getThemes", "/theme/saveThemeConfig", "/theme/upload"],
    "API Endpoints - Ticket": ["/ticket/close", "/ticket/fetch", "/ticket/reply"],
    "API Endpoints - User": ["/user/info"]
};

for (const [groupName, paths] of Object.entries(groups)) {
    md += `## ${groupName}\n`;
    for (const p of paths) {
        if (p === "/sign-in" || p === "/passport/auth/login" || p === "/user/info") {
            md += `- [x] \`${p}\`\n`;
        } else {
            md += `- [ ] \`${p}\`\n`;
        }
        
        // Remove from rawPaths if found
        const index = rawPaths.indexOf(p);
        if (index !== -1) {
            rawPaths.splice(index, 1);
        }
    }
    md += "\n";
}

if (rawPaths.length > 0) {
    md += `## Các Path/API Khác\n`;
    for (const p of rawPaths) {
        md += `- [ ] \`${p}\`\n`;
    }
}

fs.writeFileSync('api.md', md);
