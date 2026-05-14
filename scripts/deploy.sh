#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Deploy Script - Upload cards to SAP Build Work Zone 
# Card Repository via REST API (with OAuth2 auto-token)
# ═══════════════════════════════════════════════════════════════
#
# Usage:
#   ./scripts/deploy.sh                        (deploy all cards)
#   ./scripts/deploy.sh --card kpi-summary     (deploy single card)
#
# Environment variables (set in .env):
#   CLIENT_ID      - OAuth2 Client ID (from Service Key)
#   CLIENT_SECRET  - OAuth2 Client Secret (from Service Key)
#   TOKEN_URL      - OAuth2 Token endpoint (from Service Key uaa.url + /oauth/token)
#   CARD_REPO_URL  - Card Repository API endpoint
# ═══════════════════════════════════════════════════════════════

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DIST_DIR="$PROJECT_DIR/dist"
ENV_FILE="$PROJECT_DIR/.env"

# Load .env if exists
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
    echo "❌ Error: Missing environment variables:$MISSING"
    echo ""
    echo "Create a .env file (see .env.example):"
    echo "  cp .env.example .env"
    echo ""
    echo "Fill in values from your Service Key:"
    echo "  CLIENT_ID=<service_key.uaa.clientid>"
    echo "  CLIENT_SECRET=<service_key.uaa.clientsecret>"
    echo "  TOKEN_URL=<service_key.uaa.url>/oauth/token"
    echo "  CARD_REPO_URL=<service_key.endpoints.portal_rest_api>/integration/v1/cardstore/cards"
    exit 1
fi

# ═══ Get OAuth2 Bearer Token ═══
echo "🔑 Requesting OAuth2 token..."
TOKEN_RESPONSE=$(curl -s -X POST "$TOKEN_URL" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=client_credentials&client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET")

# Extract access_token
ACCESS_TOKEN=$(echo "$TOKEN_RESPONSE" | node -e "
    let data = '';
    process.stdin.on('data', chunk => data += chunk);
    process.stdin.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.access_token) {
                process.stdout.write(json.access_token);
            } else {
                console.error('Token response:', data);
                process.exit(1);
            }
        } catch(e) {
            console.error('Failed to parse token response:', data);
            process.exit(1);
        }
    });
" 2>&1)

if [ $? -ne 0 ] || [ -z "$ACCESS_TOKEN" ]; then
    echo "❌ Failed to obtain access token"
    echo "   Response: $TOKEN_RESPONSE"
    exit 1
fi

echo "   ✅ Token obtained (${#ACCESS_TOKEN} chars)"
echo ""

# ═══ Check if dist exists ═══
if [ ! -d "$DIST_DIR" ] || [ -z "$(ls -A "$DIST_DIR"/*.zip 2>/dev/null)" ]; then
    echo "⚠️  No zip files found in dist/. Running build first..."
    bash "$SCRIPT_DIR/build.sh"
    echo ""
fi

# ═══ Parse arguments ═══
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

# ═══ Deploy cards ═══
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
        -H "Authorization: Bearer $ACCESS_TOKEN" \
        -H "Content-Type: application/zip" \
        --data-binary "@$ZIP_FILE")
    
    if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
        echo "✅ Created ($HTTP_CODE)"
        DEPLOYED=$((DEPLOYED + 1))
    elif [ "$HTTP_CODE" -eq 409 ]; then
        # Card already exists, try PUT to update
        echo -n "exists, updating... "
        HTTP_CODE=$(curl -s -o /tmp/card_deploy_response.json -w "%{http_code}" \
            -X PUT "$CARD_REPO_URL/$CARD_ID" \
            -H "Authorization: Bearer $ACCESS_TOKEN" \
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