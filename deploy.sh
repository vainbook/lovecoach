#!/bin/bash
# ============================================================
# UC Training - GitHub Pages 部署腳本 (根目錄版)
# ============================================================

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

echo "📦 正在檢查並提交本地網頁變更..."
git add -A
git commit -m "Update website $(date '+%Y-%m-%d %H:%M:%S')" 2>/dev/null || true

echo "📡 推送至 GitHub main 分支..."
git push origin main

echo ""
echo "✅ 部署完成！"
echo "🌐 您的 GitHub Pages 網址：https://vainbook.github.io/lovecoach/"
echo "----------------------------------------------------"
