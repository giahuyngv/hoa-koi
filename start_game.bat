@echo off
chcp 65001 >nul
echo =========================================================
echo   HANA-KOI 2.5D (花札恋々) - Game Bài Hoa Nhật Bản Koi-Koi
echo =========================================================
echo Đang khởi động máy chủ tại http://localhost:8080 ...
start http://localhost:8080
python server.py
