#!/bin/bash
# ============================================================
# UC Training - GitHub Pages 部署腳本 (修正版)
# ============================================================

CDIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$CDIR/../.." && pwd)"
DIST_DIR="$CDIR"
TEMP_DIR="$ROOT_DIR/.deploy_temp"

echo ""
echo "🚀 開始部署至 GitHub Pages..."

# 清除並建立乾淨的暫存資料夾
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# 複製所有網頁靜態檔案到暫存區
echo "📦 複製靜態檔案..."
cp -R "$DIST_DIR/"* "$TEMP_DIR/"
# 排除部署腳本本身
rm -f "$TEMP_DIR/deploy-gh-pages.sh"

# 在暫存區初始化 git 並推送
cd "$TEMP_DIR"
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy to GitHub Pages $(date '+%Y-%m-%d %H:%M:%S')"

# 取得原專案的 remote URL
REMOTE_URL=$(cd "$ROOT_DIR" && git remote get-url origin)

echo "📡 推送至 GitHub $REMOTE_URL 的 gh-pages 分支..."
git push --force "$REMOTE_URL" gh-pages:gh-pages

# 清理暫存資料夾
cd "$ROOT_DIR"
rm -rf "$TEMP_DIR"

echo ""
echo "✅ 部署完成！"
echo "🌐 您的 GitHub Pages 網址：https://vainbook.github.io/lovecoach/"
echo "💡 注意：第一次建立分頁可能需要 1 到 2 分鐘才會生效。"
echo "----------------------------------------------------"
