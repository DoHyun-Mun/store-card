#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Deploy Script - Upload cards to SAP Build Work Zone Card Repository
# Fixed: multipart/form-data + proper ZIP structure + WORKZONE scenario
# ═══════════════════════════════════════════════════════════════

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
CARDS_DIR="$PROJECT_DIR/cards"
DIST_DIR="$PROJECT_DIR/dist"
ENV_FILE="$PROJECT_DIR/.env"

# ═══ Load .env ═══
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | grep -v '^\s*$' | xargs)
fi

# ═══ Validate environment ═══
MISSING=""
[ -z "$CLIENT_ID" ] && MISSING="$MISSING CLIENT_ID"
[ -z "$CLIENT_SECRET" ] && MISSING="$MISSING CLIENT_SECRET"
[ -z "$TOKEN_URL" ] && MISSING="$MISSING TOKEN_URL"
[ -z "$CARD_REPO_URL" ] && MISSING="$MISSING CARD_REPO_URL"

if [ -n "$MISSING" ]; then
    echo "❌ Missing env vars:$MISSING"
    exit 1
fi

# Check required tools
command -v jq >/dev/null 2>&1 || { echo "❌ jq required. brew install jq"; exit 1; }
command -v zip >/dev/null 2>&1 || { echo "❌ zip required"; exit 1; }

# ═══ Get OAuth2 token (using Basic Auth) ═══
echo "🔑 Requesting OAuth2 token..."
ACCESS_TOKEN=$(curl -sS -X POST "$TOKEN_URL" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -u "$CLIENT_ID:$CLIENT_SECRET" \
    -d "grant_type=client_credentials" \
    | jq -r .access_token)

if [ -z "$ACCESS_TOKEN" ] || [ "$ACCESS_TOKEN" = "null" ]; then
    echo "❌ Failed to obtain access token"
    exit 1
fi
echo "   ✅ Token obtained (${#ACCESS_TOKEN} chars)"
echo ""

# ═══ Parse arguments ═══
SINGLE_CARD=""
while [[ $# -gt 0 ]]; do
    case $1 in
        --card) SINGLE_CARD="$2"; shift 2 ;;
        *) shift ;;
    esac
done

# ═══ Deploy cards ═══
mkdir -p "$DIST_DIR"
echo "🚀 Deploying to: $CARD_REPO_URL"
echo ""

DEPLOYED=0
FAILED=0

for CARD_DIR in "$CARDS_DIR"/*/; do
    CARD_NAME=$(basename "$CARD_DIR")
    
    # Skip if single card specified and doesn't match
    if [ -n "$SINGLE_CARD" ] && [ "$CARD_NAME" != "$SINGLE_CARD" ]; then
        continue
    fi
    
    # Read app ID from manifest.json
    MANIFEST="$CARD_DIR/manifest.json"
    if [ ! -f "$MANIFEST" ]; then
        echo "  ⚠️  Skip $CARD_NAME: no manifest.json"
        continue
    fi
    
    APP_ID=$(jq -r '."sap.app".id' "$MANIFEST")
    if [ -z "$APP_ID" ] || [ "$APP_ID" = "null" ]; then
        echo "  ⚠️  Skip $CARD_NAME: no sap.app.id in manifest"
        continue
    fi
    
    echo -n "  ⬆️  $CARD_NAME (appId: $APP_ID) ... "
    
    # ═══ Wrap card in proper ZIP structure ═══
    # Required: root contains <APP_ID>/ folder with manifest.json inside
    TMP_DIR=$(mktemp -d)
    cp -r "$CARD_DIR" "$TMP_DIR/$APP_ID"
    ZIP_FILE="$DIST_DIR/$APP_ID.zip"
    rm -f "$ZIP_FILE"
    (cd "$TMP_DIR" && zip -r "$ZIP_FILE" "$APP_ID" -x "*.DS_Store" > /dev/null)
    rm -rf "$TMP_DIR"
    
    # ═══ Upload via multipart/form-data ═══
    HTTP_CODE=$(curl -sS -o /tmp/card_deploy_response.json -w "%{http_code}" \
        -X POST "$CARD_REPO_URL" \
        -H "Authorization: Bearer $ACCESS_TOKEN" \
        -F "file=@$ZIP_FILE;type=application/zip" \
        -F "_charset_=UTF-8" \
        -F "scenario=WORKZONE" \
        -F "appId=$APP_ID")
    
    if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
        echo "✅ ($HTTP_CODE)"
        DEPLOYED=$((DEPLOYED + 1))
    else
        echo "❌ ($HTTP_CODE)"
        cat /tmp/card_deploy_response.json 2>/dev/null
        echo ""
        FAILED=$((FAILED + 1))
    fi
done

echo ""
echo "═══════════════════════════════════════"
echo "  Deployed: $DEPLOYED | Failed: $FAILED"
echo "═══════════════════════════════════════"

rm -f /tmp/card_deploy_response.json
[ $FAILED -gt 0 ] && exit 1 || exit 0