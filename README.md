# 🤖 Store AI Dashboard - UI Integration Cards

SAP Build Work Zone Advanced Edition에서 사용할 수 있는 **UI Integration Component Cards** 모음입니다.  
점포 AI 운영 시스템 대시보드의 각 컴포넌트를 독립적인 UI Card로 구현했습니다.

> ⚠️ **중요**: 이 프로젝트는 실제 Build Work Zone Advanced 에디션에 각각의 카드로 배포되어야 하므로, 그 기반하에 표준에 맞게 설계되고 개발되어야 한다.

## 📋 카드 목록

| # | 카드명 | 폴더 | 설명 |
|---|--------|------|------|
| 1 | KPI Summary | `cards/kpi-summary` | 최근 매출, 재고 건전성, 결품 위험, 발주 대기 |
| 2 | AI Insights | `cards/ai-insights` | 오늘의 AI 인사이트 (MEDIUM/LOW/HIGH 알림) |
| 3 | Sales Trend | `cards/sales-trend` | 매출 트렌드 + AI 예측 차트 (Chart.js) |
| 4 | Store Health | `cards/store-health` | 점포별 재고 건전성 점수 그리드 |
| 5 | Order Recommendation | `cards/order-recommendation` | AI 발주 추천 Top 5 리스트 |
| 6 | Anomaly Detection | `cards/anomaly-detection` | 이상 탐지 (SPIKE/DROP) 리스트 |
| 7 | Supply Chain Network | `cards/supply-chain` | 공급망 네트워크 다이어그램 (vis-network) |
| 8 | Quick Links | `cards/quick-links` | 바로가기 (주요 기능 빠른 접근) |

## 🏗️ 프로젝트 구조

```
store-card/
├── index.html                      # 테스트/미리보기 페이지
├── package.json
├── .gitignore
├── README.md
└── cards/
    ├── kpi-summary/
    │   ├── manifest.json
    │   └── Component.js
    ├── ai-insights/
    │   ├── manifest.json
    │   └── Component.js
    ├── sales-trend/
    │   ├── manifest.json
    │   └── Component.js
    ├── store-health/
    │   ├── manifest.json
    │   └── Component.js
    ├── order-recommendation/
    │   ├── manifest.json
    │   └── Component.js
    ├── anomaly-detection/
    │   ├── manifest.json
    │   └── Component.js
    ├── supply-chain/
    │   ├── manifest.json
    │   └── Component.js
    └── quick-links/
        ├── manifest.json
        └── Component.js
```

## 🚀 로컬에서 테스트하기

```bash
# 1. http-server 실행
npx http-server -p 8080 -c-1

# 2. 브라우저에서 접속
open http://localhost:8080
```

## 🔧 기술 스택

- **SAP UI Integration Card** (Component Card 타입)
- **Chart.js 4.4.7** - 매출 트렌드 차트
- **vis-network 9.1.9** - 공급망 네트워크 다이어그램
- **SAPUI5** - UI Integration Framework

## 📌 SAP Build Work Zone에 배포하기

1. 각 카드의 `manifest.json`에 Work Zone 설정 추가
2. Card Editor에서 Component Card로 등록
3. 페이지에 카드 배치

## 📝 데이터

현재 모든 데이터는 **로컬 샘플 데이터**로 Component.js 내에 하드코딩되어 있습니다.  
실제 운영 시에는 `sap.card` manifest의 `data` 섹션에서 API 엔드포인트를 설정하면 됩니다.

## 📸 원본 대시보드

이 카드들은 [store-pjt](https://github.com/DoHyun-Mun/store-pjt) 프로젝트의 AI 대시보드를 기반으로 만들어졌습니다.