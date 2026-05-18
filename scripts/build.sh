#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Build Script - Package each card with proper folder structure
# Required: ZIP root must contain <sap.app.id>/ folder
# ═══════════════════════════════════════════════════════════════

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_DIR/dist"
CARDS_DIR="$PROJECT_DIR/cards"

echo "🔨 Building UI Integration Cards..."
echo "   Project: $PROJECT_DIR"
echo ""

# Clean dist directory
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

# Package each card as zip
for CARD_DIR in "$CARDS_DIR"/*/; do
    CARD_NAME=$(basename "$CARD_DIR")
    
    # Read sap.app.id from manifest.json
    CARD_ID=$(node -e "console.log(JSON.parse(require('fs').readFileSync('${CARD_DIR}manifest.json','utf8'))['sap.app'].id)")
    
    ZIP_NAME="${CARD_ID}.zip"
    
    echo "  📦 Packaging: $CARD_NAME → $ZIP_NAME (root: $CARD_ID/)"
    
    # ═══ 핵심 수정 ═══
    # CARD_ID 이름의 폴더로 감싸기 위해 임시 디렉토리 사용
    TMP_DIR=$(mktemp -d)
    cp -r "$CARD_DIR" "$TMP_DIR/$CARD_ID"
    
    # 임시 디렉토리에서 zip 생성 — CARD_ID 폴더가 ZIP 루트에 들어감
    (cd "$TMP_DIR" && zip -r "$DIST_DIR/$ZIP_NAME" "$CARD_ID" -x "*.DS_Store" > /dev/null 2>&1)
    
    # 임시 디렉토리 정리
    rm -rf "$TMP_DIR"
done

echo ""
echo "✅ Build complete! Output:"
echo ""
ls -la "$DIST_DIR"/*.zip 2>/dev/null | awk '{print "   " $NF " (" $5 " bytes)"}'
echo ""
echo "📁 Files are in: $DIST_DIR/"
echo ""
echo "💡 Ve