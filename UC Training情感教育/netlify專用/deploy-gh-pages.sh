#!/bin/bash
# ============================================================
# UC Training - GitHub Pages 部署腳本
# ============================================================

CDIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$CDIR/../.." && pwd)"

echo ""
echo "🚀 開始部署至 GitHub Pages..."
cd "$ROOT_DIR"

# 確保本地有提交最新修改到本地 git，因為 git subtree push 需要提交
echo "📦 正在檢查並提交本地變更..."
git add -A
git commit -m "Build & prep for GitHub Pages deploy" 2>/dev/null || true

# 執行 subtree 推送至 gh-pages 分支
echo "📡 推送中至 gh-pages 分支..."
git subtree push --prefix "UC Training情感教育/netlify專用" origin gh-pages

echo ""
echo "✅ 部署指令已發送至 GitHub！"
echo "🌐 您的 GitHub Pages 網址：https://vainbook.github.io/lovecoach/"
echo "💡 注意：第一次建立分頁可能需要 1 到 2 分鐘才會生效。"
echo "----------------------------------------------------"
