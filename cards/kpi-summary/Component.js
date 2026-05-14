sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/HTML"
], function (UIComponent, HTML) {
    "use strict";

    return UIComponent.extend("store.ai.card.kpisummary.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
        },

        createContent: function () {
            var sHtml = '<div class="kpi-row">' +
                '<div class="kpi-card">' +
                    '<div class="kpi-icon-wrap" style="background:#EBF3FE;color:#0070F2">💰</div>' +
                    '<div class="kpi-body">' +
                        '<span class="kpi-value">₩1.8억</span>' +
                        '<span class="kpi-label">최근 매출</span>' +
                        '<span class="kpi-change down">↓ 전일 대비 -0.7%</span>' +
                    '</div>' +
                '</div>' +
                '<div class="kpi-card">' +
                    '<div class="kpi-icon-wrap" style="background:#E6F4EA;color:#188038">🏥</div>' +
                    '<div class="kpi-body">' +
                        '<span class="kpi-value">72점</span>' +
                        '<span class="kpi-label">재고 건전성</span>' +
                        '<span class="kpi-change down">↓ 3</span>' +
                    '</div>' +
                '</div>' +
                '<div class="kpi-card">' +
                    '<div class="kpi-icon-wrap" style="background:#FCE8E6;color:#D93025">🚨</div>' +
                    '<div class="kpi-body">' +
                        '<span class="kpi-value">192건</span>' +
                        '<span class="kpi-label">결품 위험</span>' +
                        '<span class="kpi-sublabel">즉시 조치 →</span>' +
                    '</div>' +
                '</div>' +
                '<div class="kpi-card kpi-highlight">' +
                    '<div class="kpi-icon-wrap" style="background:#FEF3E0;color:#E37400">📋</div>' +
                    '<div class="kpi-body">' +
                        '<span class="kpi-value">14건</span>' +
                        '<span class="kpi-label">발주 대기</span>' +
                        '<span class="kpi-sublabel">승인 필요 →</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<style>' +
                '.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.6rem; padding: 0.75rem; font-family: "Inter", "72", sans-serif; }' +
                '.kpi-card { background: #fff; border: 1px solid #E5E8ED; border-radius: 12px; padding: 1rem 1.15rem; display: flex; align-items: center; gap: 0.85rem; box-shadow: 0 1px 4px rgba(29,45,62,0.06); transition: all 0.2s; cursor: pointer; }' +
                '.kpi-card:hover { box-shadow: 0 4px 16px rgba(29,45,62,0.08); transform: translateY(-2px); border-color: #0070F2; }' +
                '.kpi-card.kpi-highlight { border: 2px solid #D93025; background: #FFF8F7; }' +
                '.kpi-icon-wrap { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }' +
                '.kpi-body { display: flex; flex-direction: column; }' +
                '.kpi-value { font-size: 1.35rem; font-weight: 700; line-height: 1.2; color: #1D2D3E; }' +
                '.kpi-label { font-size: 0.7rem; font-weight: 500; color: #8396A8; margin-top: 0.1rem; }' +
                '.kpi-change { font-size: 0.68rem; font-weight: 600; margin-top: 0.15rem; }' +
                '.kpi-change.up { color: #188038; }' +
                '.kpi-change.down { color: #D93025; }' +
                '.kpi-sublabel { font-size: 0.62rem; color: #8396A8; margin-top: 0.1rem; }' +
                '@media (max-width: 600px) { .kpi-row { grid-template-columns: repeat(2, 1fr); } }' +
            '</style>';

            return new HTML({ content: sHtml });
        }
    });
});