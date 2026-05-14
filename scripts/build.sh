#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Build Script - Package each card as individual zip for 
# SAP Build Work Zone Card Repository API deployment
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
    
    echo "  📦 Packaging: $CARD_NAME → $ZIP_NAME"
    
    # Create zip from card directory
    cd "$CARD_DIR"
    zip -r "$DIST_DIR/$ZIP_NAME" . -x "*.DS_Store" > /dev/null 2>&1
    cd "$PROJECT_DIR"
done

echo ""
echo "✅ Build complete! Output:"
echo ""
ls -la "$DIST_DIR"/*.zip 2>/dev/null | awk '{print "   " $NF " (" $5 " bytes)"}'
echo ""
echo "📁 Files are in: $DIST_DIR/"