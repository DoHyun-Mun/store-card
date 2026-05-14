sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/HTML"
], function (UIComponent, HTML) {
    "use strict";

    return UIComponent.extend("store.ai.card.anomalydetection.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
        },

        createContent: function () {
            var aAnomalies = [
                { store: "강남 본점", metric: "revenue", zScore: "8.3", deviation: "934346", type: "SPIKE" },
                { store: "서초 지점", metric: "quantity", zScore: "-3.0", deviation: "-15", type: "DROP" },
                { store: "잠실 지점", metric: "customerCount", zScore: "8.7", deviation: "26", type: "SPIKE" },
                { store: "여의도 지점", metric: "profit", zScore: "-4.7", deviation: "-124667", type: "DROP" },
                { store: "홍대 지점", metric: "revenue", zScore: "-3.4", deviation: "-280540", type: "SPIKE" }
            ];

            var sItems = aAnomalies.map(function (it) {
                var icon = it.type === "SPIKE" ? "📈" : "📉";
                return '<div class="anom-item">' +
                    '<div class="anom-icon">' + icon + '</div>' +
                    '<div class="anom-info">' +
                        '<div class="anom-title">' + it.store + ' ' + it.metric + '</div>' +
                        '<div class="anom-sub">Z:' + it.zScore + ' | Dev:' + it.deviation + '</div>' +
                    '</div>' +
                    '<span class="anom-badge ' + it.type + '">' + it.type + '</span>' +
                '</div>';
            }).join("");

            var sHtml = '<div class="anomaly-container">' +
                '<div class="anomaly-list">' + sItems + '</div>' +
            '</div>' +
            '<style>' +
                '.anomaly-container { padding: 0.5rem 0.75rem; font-family: "Inter", "72", sans-serif; }' +
                '.anomaly-list { max-height: 280px; overflow-y: auto; }' +
                '.anom-item { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 0.6rem; border-bottom: 1px solid #EEF1F5; font-size: 0.75rem; transition: background 0.2s; }' +
                '.anom-item:hover { background: #F5F6FA; }' +
                '.anom-item:last-child { border-bottom: none; }' +
                '.anom-icon { font-size: 1.1rem; flex-shrink: 0; }' +
                '.anom-info { flex: 1; min-width: 0; }' +
                '.anom-title { font-weight: 600; font-size: 0.75rem; color: #1D2D3E; }' +
                '.anom-sub { font-size: 0.65rem; color: #8396A8; }' +
                '.anom-badge { font-size: 0.6rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px; white-space: nowrap; }' +
                '.anom-badge.SPIKE { background: #E6F4EA; color: #2E7D32; }' +
                '.anom-badge.DROP { background: #FFEBEE; color: #C62828; }' +
            '</style>';

            return new HTML({ content: sHtml });
        }
    });
});