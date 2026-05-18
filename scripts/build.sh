#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Build Script - Package each card with proper folder structure
# Required: ZIP root must contain <sap.app.id>/ folder
#
# Usage:
#   ./scripts/build.sh                        (build all cards)
#   ./scripts/build.sh --card kpi-summary     (build single card)
# ═══════════════════════════════════════════════════════════════

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_DIR/dist"
CARDS_DIR="$PROJECT_DIR/cards"

# ═══ Parse arguments ═══
SINGLE_CARD=""
while [[ $# -gt 0 ]]; do
    case $1 in
        --card)
            SINGLE_CARD="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 [--card <card-folder-name>]"
            exit 1
            ;;
    esac
done

echo "🔨 Building UI Integration Cards..."
echo "   Project: $PROJECT_DIR"
if [ -n "$SINGLE_CARD" ]; then
    echo "   Target:  $SINGLE_CARD (single card)"
else
    echo "   Target:  all cards"
fi
echo ""

# ═══ Clean dist directory ═══
if [ -z "$SINGLE_CARD" ]; then
    rm -rf "$DIST_DIR"
    mkdir -p "$DIST_DIR"
else
    mkdir -p "$DIST_DIR"
fi

BUILT=0
SKIPPED=0
BUILT_FILES=()

# ═══ Package each card ═══
for CARD_DIR in "$CARDS_DIR"/*/; do
    CARD_NAME=$(basename "$CARD_DIR")
    
    # Skip if single card specified and doesn't match
    if [ -n "$SINGLE_CARD" ] && [ "$CARD_NAME" != "$SINGLE_CARD" ]; then
        SKIPPED=$((SKIPPED + 1))
        continue
    fi
    
    # Validate manifest.json exists
    MANIFEST="$CARD_DIR/manifest.json"
    if [ ! -f "$MANIFEST" ]; then
        echo "  ⚠️  Skip $CARD_NAME: no manifest.json"
        continue
    fi
    
    # Read sap.app.id from manifest.json
    CARD_ID=$(node -e "console.log(JSON.parse(require('fs').readFileSync('${CARD_DIR}manifest.json','utf8'))['sap.app'].id)")
    
    if [ -z "$CARD_ID" ]; then
        echo "  ⚠️  Skip $CARD_NAME: cannot read sap.app.id"
        continue
    fi
    
    ZIP_NAME="${CARD_ID}.zip"
    
    echo "  📦 Packaging: $CARD_NAME → $ZIP_NAME"
    
    # Remove old ZIP for clean rebuild
    rm -f "$DIST_DIR/$ZIP_NAME"
    
    # Wrap card content in CARD_ID folder via temp directory
    TMP_DIR=$(mktemp -d)
    cp -r "$CARD_DIR" "$TMP_DIR/$CARD_ID"
    (cd "$TMP_DIR" && zip -r "$DIST_DIR/$ZIP_NAME" "$CARD_ID" -x "*.DS_Store" > /dev/null 2>&1)
    rm -rf "$TMP_DIR"
    
    BUILT_FILES+=("$DIST_DIR/$ZIP_NAME")
    BUILT=$((BUILT + 1))
done

# ═══ Validate single card was found ═══
if [ -n "$SINGLE_CARD" ] && [ $BUILT -eq 0 ]; then
    echo ""
    echo "❌ Error: Card '$SINGLE_CARD' not found in $CARDS_DIR/"
    echo ""
    echo "Available cards:"
    ls -1 "$CARDS_DIR" 2>/dev/null | sed 's/^/  - /'
    exit 1
fi

echo ""
echo "✅ Build complete!"
echo "   Built: $BUILT card(s)"
[ $SKIPPED -gt 0 ] && echo "   Skipped: $SKIPPED card(s)"
echo ""
echo "📁 Output directory: $DIST_DIR/"
echo ""

# ═══ Show what was built in THIS run ═══
echo "📦 Built in this run:"
for ZIP_FILE in "${BUILT_FILES[@]}"; do
    SIZE=$(stat -f%z "$ZIP_FILE" 2>/dev/null || stat -c%s "$ZIP_FILE")
    echo "   ✓ $(basename "$ZIP_FILE") (${SIZE} bytes)"
done

# ═══ Notify about other existing ZIPs (only on single card builds) ═══
if [ -n "$SINGLE_CARD" ]; then
    TOTAL_ZIPS=$(ls "$DIST_DIR"/*.zip 2>/dev/null | wc -l | tr -d ' ')
    OTHER_COUNT=$((TOTAL_ZIPS - ${#BUILT_FILES[@]}))
    if [ $OTHER_COUNT -gt 0 ]; then
        echo ""
        echo "ℹ️  $OTHER_COUNT other ZIP(s) exist in dist/ from previous builds"
        echo "   (Use './scripts/build.sh' without --card to rebuild all)"
    fi
fi