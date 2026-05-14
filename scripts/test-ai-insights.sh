#!/bin/bash
# AI Insights 카드 배포 테스트
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# .env 파싱 (특수문자 안전하게)
TOKEN_URL=$(grep '^TOKEN_URL=' "$PROJECT_DIR/.env" | cut -d= -f2-)
CLIENT_ID=$(grep '^CLIENT_ID=' "$PROJECT_DIR/.env" | cut -d= -f2-)
CLIENT_SECRET=$(grep '^CLIENT_SECRET=' "$PROJECT_DIR/.env" | cut -d= -f2-)
CARD_REPO_URL=$(grep '^CARD_REPO_URL=' "$PROJECT_DIR/.env" | cut -d= -f2-)

echo "=== AI Insights 카드 배포 테스트 ==="
echo "Token URL: $TOKEN_URL"
echo "Card Repo: $CARD_REPO_URL"
echo ""

# 1. 토큰 발급
echo "1️⃣  토큰 발급 중..."
TOKEN=$(curl -s -X POST "$TOKEN_URL" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "grant_type=client_credentials" \
  --data-urlencode "client_id=$CLIENT_ID" \
  --data-urlencode "client_secret=$CLIENT_SECRET" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "❌ 토큰 발급 실패!"
  exit 1
fi
echo "✅ 토큰 발급 성공 (${#TOKEN} chars)"
echo ""

# 2. 인증 확인
echo "2️⃣  인증 확인 (GET /content-repository/list)..."
RESP=$(curl -s -w "\n%{http_code}" "https://portal-service.cfapps.jp10.hana.ondemand.com/content-repository/list" \
  -H "Authorization: Bearer $TOKEN")
HTTP_CODE=$(echo "$RESP" | tail -1)
BODY=$(echo "$RESP" | sed '$d')
echo "   HTTP: $HTTP_CODE"
echo "   Body: ${BODY:0:200}"
echo ""

# 3. 카드 배포
echo "3️⃣  AI Insights 카드 배포 (POST multipart/form-data)..."
ZIP_FILE="$PROJECT_DIR/dist/store.ai.card.aiinsights.zip"
if [ ! -f "$ZIP_FILE" ]; then
  echo "   zip 파일 생성 중..."
  cd "$PROJECT_DIR/cards/ai-insights"
  zip -r "$ZIP_FILE" . -x "*.DS_Store" > /dev/null 2>&1
  cd "$PROJECT_DIR"
fi

RESP=$(curl -s -w "\n%{http_code}" -X POST "$CARD_REPO_URL" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@$ZIP_FILE;type=application/zip" \
  -F "_charset_=UTF-8" \
  -F "scenario=WORKZONE" \
  -F "appId=store.ai.card.aiinsights")
HTTP_CODE=$(echo "$RESP" | tail -1)
BODY=$(echo "$RESP" | sed '$d')
echo "   HTTP: $HTTP_CODE"
echo "   Body: ${BODY:0:500}"
echo ""

if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
  echo "🎉 배포 성공!"
else
  echo "❌ 배포 실패 (HTTP $HTTP_CODE)"
fi