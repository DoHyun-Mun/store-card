# 🤖 Store AI Dashboard - UI Integration Cards

SAP Build Work Zone Advanced Edition에서 사용할 수 있는 **UI Integration Component Cards** 모음입니다.  
점포 AI 운영 시스템 대시보드의 각 컴포넌트를 독립적인 UI Card로 구현했습니다.

> ⚠️ **중요**: 이 프로젝트는 실제 Build Work Zone Advanced 에디션에 각각의 카드로 배포되어야 하므로, 그 기반하에 표준에 맞게 설계되고 개발되어야 한다.

---

## 🚀 배포 정보 (검증 완료)

### API Endpoint
```
POST https://portal-service.cfapps.jp10.hana.ondemand.com/content-repository/v2/cards/publish
```

### 인증
- **방식**: OAuth2 Client Credentials Flow
- **Token URL**: `https://btpworkzonedemo-15muu1qi.authentication.jp10.hana.ondemand.com/oauth/token`
- **Client ID**: Service Key의 `uaa.clientid`
- **Client Secret**: Service Key의 `uaa.clientsecret`

### 요청 형식
- **Content-Type**: `multipart/form-data`
- **필수 파라미터**:
  | 파라미터 | 값 |
  |---------|---|
  | `file` | zip 파일 (application/zip) |
  | `_charset_` | UTF-8 |
  | `scenario` | WORKZONE |
  | `appId` | manifest.json의 sap.app.id |

### ZIP 파일 구조 (필수)
```
<app-id>/                          ← 폴더명 = sap.app.id
├── manifest.json                  ← 필수
├── Component.js                   ← 필수
├── View.view.xml                  ← UI 렌더링
├── Card.controller.js             ← 로직/데이터
└── dt/
    └── configuration.js           ← Design-time 설정
```

> 📌 **중요**: ZIP 파일 내에 반드시 **폴더를 포함**해야 합니다. 루트에 바로 파일이 있으면 "manifest.json not found" 에러 발생.

### 배포 cURL 예시
```bash
# 1. 토큰 발급
TOKEN=$(curl -s -X POST "$TOKEN_URL" \
  --data-urlencode "grant_type=client_credentials" \
  --data-urlencode "client_id=$CLIENT_ID" \
  --data-urlencode "client_secret=$CLIENT_SECRET" | jq -r .access_token)

# 2. 카드 업로드
curl -X POST "https://portal-service.cfapps.jp10.hana.ondemand.com/content-repository/v2/cards/publish" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@./dist/store.ai.card.aiinsights.zip;type=application/zip" \
  -F "_charset_=UTF-8" \
  -F "scenario=WORKZONE" \
  -F "appId=store.ai.card.aiinsights"
```

### 성공 응답
```json
{
  "publishStatus": {
    "cardId": "store.ai.card.aiinsights",
    "versionKey": "3f47db3ca7e06e61a02d4cf79faf0b59",
    "appId": "store.ai.card.aiinsights"
  }
}
```

---

## 📋 카드 목록

| # | 카드명 | App ID | 설명 |
|---|--------|--------|------|
| 1 | KPI Summary | `store.ai.card.kpisummary` | 최근 매출, 재고 건전성, 결품 위험, 발주 대기 |
| 2 | AI Insights | `store.ai.card.aiinsights` | 오늘의 AI 인사이트 (MEDIUM/LOW/HIGH 알림) |
| 3 | Sales Trend | `store.ai.card.salestrend` | 매출 트렌드 + AI 예측 차트 |
| 4 | Store Health | `store.ai.card.storehealth` | 점포별 재고 건전성 점수 그리드 |
| 5 | Order Recommendation | `store.ai.card.orderrecommendation` | AI 발주 추천 Top 5 리스트 |
| 6 | Anomaly Detection | `store.ai.card.anomalydetection` | 이상 탐지 (SPIKE/DROP) 리스트 |
| 7 | Supply Chain Network | `store.ai.card.supplychain` | 공급망 네트워크 다이어그램 |
| 8 | Quick Links | `store.ai.card.quicklinks` | 바로가기 (주요 기능 빠른 접근) |

## 🏗️ 프로젝트 구조

```
store-card/
├── index.html                      # 로컬 프리뷰 페이지
├── package.json
├── .env                            # 배포 인증 정보 (git 미포함)
├── .env.example                    # .env 템플릿
├── README.md
├── uicard_sample.zip               # 참고 샘플 카드
├── cards/                          # 각 카드 소스
│   ├── ai-insights/
│   │   ├── manifest.json
│   │   ├── Component.js
│   │   ├── View.view.xml
│   │   ├── Card.controller.js
│   │   └── dt/configuration.js
│   ├── kpi-summary/
│   ├── sales-trend/
│   ├── store-health/
│   ├── order-recommendation/
│   ├── anomaly-detection/
│   ├── supply-chain/
│   └── quick-links/
├── dist/                           # 빌드된 zip 파일 (git 미포함)
└── scripts/
    ├── build.sh                    # 전체 카드 zip 빌드
    ├── deploy.sh                   # 전체 카드 API 배포
    └── test-ai-insights.sh         # 단일 카드 테스트
```

## 🔧 사용법

### 빌드 & 배포
```bash
# .env 설정
cp .env.example .env
# CLIENT_ID, CLIENT_SECRET, TOKEN_URL, CARD_REPO_URL 입력

# 전체 빌드
npm run build

# 전체 배포
npm run deploy

# 단일 카드 테스트 (ai-insights)
bash scripts/test-ai-insights.sh
```

### 로컬 프리뷰
```bash
npx http-server -p 8080 -c-1
open http://localhost:8080
```

## 📸 원본 대시보드

이 카드들은 [store-pjt](https://github.com/DoHyun-Mun/store-pjt) 프로젝트의 AI 대시보드를 기반으로 만들어졌습니다.

## ZIP 구조 (중요!)

ZIP 안의 루트에 manifest.json이 바로 있으면 안 되고, 
sap.app.id와 동일한 이름의 폴더로 한 번 더 감싸야 함.

❌ 잘못된 구조:
my-card.zip
├── manifest.json
└── i18n/

✅ 올바른 구조:
my-card.zip
└── store.ai.card.kpisummary/   ← sap.app.id 이름
    ├── manifest.json
    └── i18n/