sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/HTML"
], function (UIComponent, HTML) {
    "use strict";

    return UIComponent.extend("store.ai.card.storehealth.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
        },

        createContent: function () {
            var aStores = [
                { name: "천안 신부점", score: 66, status: "YELLOW", alerts: 8 },
                { name: "명동 지점", score: 67, status: "YELLOW", alerts: 8 },
                { name: "서초 지점", score: 69, status: "YELLOW", alerts: 7 },
                { name: "여의도 지점", score: 69, status: "YELLOW", alerts: 6 },
                { name: "홍대 지점", score: 69, status: "YELLOW", alerts: 8 },
                { name: "부산 서면점", score: 69, status: "YELLOW", alerts: 10 },
                { name: "잠실 지점", score: 70, status: "YELLOW", alerts: 4 },
                { name: "종로 지점", score: 70, status: "YELLOW", alerts: 7 },
                { name: "인천 송도점", score: 70, status: "YELLOW", alerts: 5 },
                { name: "광주 충장로점", score: 70, status: "YELLOW", alerts: 6 },
                { name: "전주 재시점", score: 70, status: "YELLOW", alerts: 6 },
                { name: "신촌 지점", score: 71, status: "YELLOW", alerts: 3 },
                { name: "부산 해운대점", score: 71, status: "YELLOW", alerts: 8 },
                { name: "동대문 지점", score: 72, status: "GREEN", alerts: 3 },
                { name: "대전 둔산점", score: 72, status: "GREEN", alerts: 12 },
                { name: "청주 상당점", score: 72, status: "GREEN", alerts: 7 },
                { name: "이태원 지점", score: 73, status: "GREEN", alerts: 5 },
                { name: "강남 본점", score: 74, status: "GREEN", alerts: 5 },
                { name: "고양 일산점", score: 74, status: "GREEN", alerts: 8 },
                { name: "창원 상남점", score: 74, status: "GREEN", alerts: 7 },
                { name: "울산 삼산점", score: 75, status: "GREEN", alerts: 5 },
                { name: "대구 동성로점", score: 76, status: "GREEN", alerts: 6 },
                { name: "수원 인계점", score: 77, status: "GREEN", alerts: 5 },
                { name: "용인 수지점", score: 78, status: "GREEN", alerts: 8 },
                { name: "포항 북구점", score: 78, status: "GREEN", alerts: 6 },
                { name: "제주 연동점", score: 79, status: "GREEN", alerts: 6 },
                { name: "성남 분당점", score: 83, status: "GREEN", alerts: 4 }
            ];

            var sItems = aStores.map(function (s) {
                var icon = s.status === "GREEN" ? "🟢" : s.status === "YELLOW" ? "🟡" : "🔴";
                var alertText = s.alerts > 0 ? "⚠️ " + s.alerts + "건" : "✅ 정상";
                return '<div class="sh-item ' + s.status + '">' +
                    '<div class="sh-icon">' + icon + '</div>' +
                    '<div class="sh-score">' + s.score + '점</div>' +
                    '<div class="sh-name">' + s.name + '</div>' +
                    '<div class="sh-sub">' + alertText + '</div>' +
                '</div>';
            }).join("");

            var sHtml = '<div class="store-health-container">' +
                '<div class="store-health-grid">' + sItems + '</div>' +
            '</div>' +
            '<style>' +
                '.store-health-container { padding: 0.5rem 0.75rem; font-family: "Inter", "72", sans-serif; }' +
                '.store-health-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 0.4rem; max-height: 320px; overflow-y: auto; padding: 0.3rem; }' +
                '.store-health-grid::-webkit-scrollbar { width: 4px; }' +
                '.store-health-grid::-webkit-scrollbar-thumb { background: #E5E8ED; border-radius: 4px; }' +
                '.sh-item { text-align: center; padding: 0.5rem 0.3rem; border-radius: 8px; border: 1px solid #EEF1F5; cursor: pointer; transition: all 0.2s; }' +
                '.sh-item:hover { box-shadow: 0 2px 8px rgba(29,45,62,0.08); transform: scale(1.02); }' +
                '.sh-item.GREEN { background: #E8F5E9; }' +
                '.sh-item.YELLOW { background: #FFF8E1; }' +
                '.sh-item.RED { background: #FFEBEE; }' +
                '.sh-icon { font-size: 1.1rem; }' +
                '.sh-score { font-size: 0.72rem; font-weight: 700; color: #1D2D3E; }' +
                '.sh-name { font-size: 0.62rem; font-weight: 600; margin-top: 0.15rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #1D2D3E; }' +
                '.sh-sub { font-size: 0.55rem; color: #8396A8; margin-top: 0.1rem; }' +
            '</style>';

            return new HTML({ content: sHtml });
        }
    });
});