#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Deploy Script - Upload cards to SAP Build Work Zone 
# Card Repository via REST API
# ═══════════════════════════════════════════════════════════════
#
# Usage:
#   ./scripts/deploy.sh
#   ./scripts/deploy.sh --card kpi-summary     (deploy single card)
#
# Environment variables (set in .env or export):
#   CARD_REPO_URL   - Card Repository API base URL
#   CARD_REPO_TOKEN - Bearer token for authentication
# ═══════════════════════════════════════════════════════════════

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_DIR/dist"
ENV_FILE="$PROJECT_DIR/.env"

# Load .env if exists
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

# Validate environment
if [ -z "$CARD_REPO_URL" ]; then
    echo "❌ Error: CARD_REPO_URL is not set"
    echo ""
    echo "Set it in .env file or export:"
    echo "  export CARD_REPO_URL=https://<your-workzone-host>/integration/v1/cardstore/cards"
    echo "  export CARD_REPO_TOKEN=<your-bearer-token>"
    exit 1
fi

if [ -z "$CARD_REPO_TOKEN" ]; then
    echo "❌ Error: CARD_REPO_TOKEN is not set"
    echo ""
    echo "Set it in .env file or export:"
    echo "  export CARD_REPO_TOKEN=<your-bearer-token>"
    exit 1
fi

# Check if dist exists
if [ ! -d "$DIST_DIR" ] || [ -z "$(ls -A "$DIST_DIR"/*.zip 2>/dev/null)" ]; then
    echo "⚠️  No zip files found in dist/. Running build first..."
    bash "$SCRIPT_DIR/build.sh"
    echo ""
fi

# Parse arguments
SINGLE_CARD=""
while [[ $# -gt 0 ]]; do
    case $1 in
        --card)
            SINGLE_CARD="$2"
            shift 2
            ;;
        *)
            shift
            ;;
    esac
done

echo "🚀 Deploying to Card Repository..."
echo "   URL: $CARD_REPO_URL"
echo ""

# Deploy cards
DEPLOYED=0
FAILED=0

for ZIP_FILE in "$DIST_DIR"/*.zip; do
    ZIP_NAME=$(basename "$ZIP_FILE")
    CARD_ID="${ZIP_NAME%.zip}"
    
    # If single card specified, skip others
    if [ -n "$SINGLE_CARD" ] && [[ "$ZIP_NAME" != *"$SINGLE_CARD"* ]]; then
        continue
    fi
    
    echo -n "  ⬆️  Uploading: $ZIP_NAME ... "
    
    HTTP_CODE=$(curl -s -o /tmp/card_deploy_response.json -w "%{http_code}" \
        -X POST "$CARD_REPO_URL" \
        -H "Authorization: Bearer $CARD_REPO_TOKEN" \
        -H "Content-Type: application/zip" \
        --data-binary "@$ZIP_FILE")
    
    if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
        echo "✅ ($HTTP_CODE)"
        DEPLOYED=$((DEPLOYED + 1))
    elif [ "$HTTP_CODE" -eq 409 ]; then
        # Card already exists, try PUT to update
        echo -n "exists, updating... "
        HTTP_CODE=$(curl -s -o /tmp/card_deploy_response.json -w "%{http_code}" \
            -X PUT "$CARD_REPO_URL/$CARD_ID" \
            -H "Authorization: Bearer $CARD_REPO_TOKEN" \
            -H "Content-Type: application/zip" \
            --data-binary "@$ZIP_FILE")
        
        if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
            echo "✅ Updated ($HTTP_CODE)"
            DEPLOYED=$((DEPLOYED + 1))
        else
            echo "❌ Failed ($HTTP_CODE)"
            cat /tmp/card_deploy_response.json 2>/dev/null
            echo ""
            FAILED=$((FAILED + 1))
        fi
    else
        echo "❌ Failed ($HTTP_CODE)"
        cat /tmp/card_deploy_response.json 2>/dev/null
        echo ""
        FAILED=$((FAILED + 1))
    fi
done

echo ""
echo "═══════════════════════════════════════"
echo "  Deployed: $DEPLOYED | Failed: $FAILED"
echo "═══════════════════════════════════════"

# Cleanup
rm -f /tmp/card_deploy_response.json

if [ $FAILED -gt 0 ]; then
    exit 1
fi