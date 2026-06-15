#!/bin/bash
# ============================================================
# UC Training - Netlify 自動部署腳本
# 使用方法：雙擊此腳本，或在 Terminal 執行 ./auto-deploy.sh
# ============================================================

WATCH_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "🚀 UC Training 自動部署已啟動"
echo "📁 監聽資料夾：$WATCH_DIR"
echo "📡 偵測到存檔變更 → 自動上傳到 Netlify"
echo "🌐 網站：https://uctrainingdating.netlify.app"
echo "⏹  按 Ctrl+C 停止"
echo "----------------------------------------------------"

# 監聽檔案變更（排除 .sh 腳本和 .DS_Store）
fswatch -o "$WATCH_DIR" \
  --exclude="\.sh$" \
  --exclude="\.DS_Store" \
  --exclude="/\.netlify/" | while read changes; do
  echo ""
  echo "🔄 偵測到變更，部署中... $(date '+%H:%M:%S')"
  netlify deploy --prod --dir="$WATCH_DIR" --message="Auto deploy $(date '+%Y-%m-%d %H:%M:%S')"
  echo "✅ 部署完成！前往 https://uctrainingdating.netlify.app 查看"
  echo "----------------------------------------------------"
done
