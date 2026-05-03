@echo off
setlocal
cd /d "%~dp0source"

echo [1/3] Cai dat dependencies (neu chua co)...
if not exist "node_modules" (
    call npm install
)

echo [2/3] Build source code thanh thu muc dist...
call npm run build

if exist "..\dist" (
    echo [3/3] Dang sao chep cac file can thiet...
    if not exist "..\dist\locales" mkdir "..\dist\locales"
    xcopy /Y /E "i18n\locales\*" "..\dist\locales\"
    if exist "..\dist\.vite\manifest.json" (
        move /y "..\dist\.vite\manifest.json" "..\dist\manifest.json"
        rmdir "..\dist\.vite"
    )
    echo.
    echo ========================================================
    echo Build hoan thanh! 
    echo Ban co the chay "npx serve dist" de preview ket qua.
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo Build that bai! Vui long kiem tra lai log o tren.
    echo ========================================================
)
pause
