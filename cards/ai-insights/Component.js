sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/HTML"
], function (UIComponent, HTML) {
    "use strict";

    return UIComponent.extend("store.ai.card.aiinsights.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
        },

        createContent: function () {
            var aInsights = [
                { severity: "MEDIUM", title: "잠실 지점 customerCount 급증 감지 (+26)", desc: "실적: 46 / 예측: 20 (Z-Score: 8.7)", m1l: "실적건", m1v: "46", m2l: "Z-SCORE", m2v: "8.7", action: "상세 분석 보기" },
                { severity: "MEDIUM", title: "강남 본점 revenue 급증 감지 (+934346)", desc: "실적: 1684346 / 예측: 750000 (Z-Score: 8.3)", m1l: "실적값", m1v: "1684346", m2l: "Z-SCORE", m2v: "8.3", action: "상세 분석 보기" },
                { severity: "LOW", title: "AI 발주 추천 25건 대기 중", desc: "총 추천 수량: 3771개, HIGH 5건 포함", m1l: "추천 건수", m1v: "25건", m2l: "총 수량", m2v: "3771개", action: "발주 추천 검토" },
                { severity: "HIGH", title: "서초 지점 '노트북 에어 13' 결품 임박", desc: "현재고 17개, 7일 예측수요 172개", m1l: "현재고", m1v: "17개", m2l: "예측수요(7일)", m2v: "172개", action: "즉시 발주 추천 보기" },
                { severity: "HIGH", title: "강남 본점 '노트북 에어 13' 결품 임박", desc: "현재고 13개, 7일 예측수요 218개", m1l: "현재고", m1v: "13개", m2l: "예측수요(7일)", m2v: "218개", action: "즉시 발주 추천 보기" }
            ];

            var sCards = aInsights.map(function(it) {
                return '<div class="ai-insight-card severity-' + it.severity + '">' +
                    '<span class="insight-badge ' + it.severity + '">' + it.severity + '</span>' +
                    '<div class="insight-title">' + it.title + '</div>' +
                    '<div class="insight-desc">' + it.desc + '</div>' +
                    '<div class="insight-metrics">' +
                        '<div class="insight-metric"><span class="insight-metric-label">' + it.m1l + '</span><span class="insight-metric-value">' + it.m1v + '</span></div>' +
                        '<div class="insight-metric"><span class="insight-metric-label">' + it.m2l + '</span><span class="insight-metric-value">' + it.m2v + '</span></div>' +
                    '</div>' +
                    '<a class="insight-action">' + it.action + ' →</a>' +
                '</div>';
            }).join("");

            var sHtml = '<div class="ai-insights-container">' +
                '<div class="ai-insights-row">' + sCards + '</div>' +
            '</div>' +
            '<style>' +
                '.ai-insights-container { padding: 0.5rem 0.75rem; font-family: "Inter", "72", sans-serif; }' +
                '.ai-insights-row { display: flex; gap: 0.6rem; overflow-x: auto; padding-bottom: 0.5rem; }' +
                '.ai-insights-row::-webkit-scrollbar { height: 4px; }' +
                '.ai-insights-row::-webkit-scrollbar-thumb { background: #E5E8ED; border-radius: 4px; }' +
                '.ai-insight-card { min-width: 260px; max-width: 300px; flex-shrink: 0; background: #fff; border-radius: 12px; padding: 0.85rem 1rem; border-left: 4px solid #E5E8ED; box-shadow: 0 1px 4px rgba(29,45,62,0.06); transition: all 0.2s; }' +
                '.ai-insight-card:hover { box-shadow: 0 4px 16px rgba(29,45,62,0.08); transform: translateY(-1px); }' +
                '.ai-insight-card.severity-HIGH { border-left-color: #D93025; }' +
                '.ai-insight-card.severity-MEDIUM { border-left-color: #E37400; }' +
                '.ai-insight-card.severity-LOW { border-left-color: #188038; }' +
                '.insight-badge { display: inline-block; font-size: 0.6rem; font-weight: 700; padding: 0.15rem 0.45rem; border-radius: 4px; text-transform: uppercase; margin-bottom: 0.35rem; }' +
                '.insight-badge.HIGH { background: #FCE8E6; color: #D93025; }' +
                '.insight-badge.MEDIUM { background: #FEF3E0; color: #E37400; }' +
                '.insight-badge.LOW { background: #E6F4EA; color: #188038; }' +
                '.insight-title { font-size: 0.78rem; font-weight: 600; margin-bottom: 0.3rem; line-height: 1.3; color: #1D2D3E; }' +
                '.insight-desc { font-size: 0.7rem; color: #556B82; margin-bottom: 0.4rem; line-height: 1.4; }' +
                '.insight-metrics { display: flex; gap: 1rem; margin-bottom: 0.4rem; }' +
                '.insight-metric { display: flex; flex-direction: column; }' +
                '.insight-metric-label { font-size: 0.58rem; color: #8396A8; text-transform: uppercase; }' +
                '.insight-metric-value { font-size: 0.75rem; font-weight: 700; color: #1D2D3E; }' +
                '.insight-action { font-size: 0.68rem; color: #0070F2; font-weight: 600; cursor: pointer; text-decoration: none; }' +
                '.insight-action:hover { text-decoration: underline; }' +
            '</style>';

            return new HTML({ content: sHtml });
        }
    });
});