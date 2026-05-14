sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/HTML"
], function (UIComponent, HTML) {
    "use strict";

    return UIComponent.extend("store.ai.card.orderrecommendation.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
        },

        createContent: function () {
            var aItems = [
                { rank: 1, priority: "HIGH", store: "강남 본점", product: "노트북 에어 13", qty: 295 },
                { rank: 2, priority: "HIGH", store: "서초 지점", product: "노트북 에어 13", qty: 227 },
                { rank: 3, priority: "HIGH", store: "잠실 지점", product: "노트북 에어 13", qty: 235 },
                { rank: 4, priority: "MEDIUM", store: "홍대 지점", product: "울인원 PC", qty: 102 },
                { rank: 5, priority: "MEDIUM", store: "강남 본점", product: "미니 PC", qty: 172 }
            ];

            var sItems = aItems.map(function (it) {
                return '<div class="rec-item">' +
                    '<div class="rec-rank ' + it.priority + '">' + it.rank + '</div>' +
                    '<div class="rec-info">' +
                        '<div class="rec-title">' + it.store + '</div>' +
                        '<div class="rec-sub">' + it.product + '</div>' +
                    '</div>' +
                    '<div class="rec-qty">+' + it.qty + '</div>' +
                    '<button class="rec-action">발주</button>' +
                '</div>';
            }).join("");

            var sHtml = '<div class="order-rec-container">' +
                '<div class="recommendation-list">' + sItems + '</div>' +
            '</div>' +
            '<style>' +
                '.order-rec-container { padding: 0.5rem 0.75rem; font-family: "Inter", "72", sans-serif; }' +
                '.recommendation-list { max-height: 280px; overflow-y: auto; }' +
                '.rec-item { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 0.6rem; border-bottom: 1px solid #EEF1F5; font-size: 0.75rem; transition: background 0.2s; }' +
                '.rec-item:hover { background: #F5F6FA; }' +
                '.rec-item:last-child { border-bottom: none; }' +
                '.rec-rank { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 700; color: white; flex-shrink: 0; }' +
                '.rec-rank.HIGH { background: #D93025; }' +
                '.rec-rank.MEDIUM { background: #E37400; }' +
                '.rec-rank.LOW { background: #188038; }' +
                '.rec-info { flex: 1; min-width: 0; }' +
                '.rec-title { font-weight: 600; font-size: 0.75rem; color: #1D2D3E; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
                '.rec-sub { font-size: 0.65rem; color: #8396A8; }' +
                '.rec-qty { font-weight: 700; font-size: 0.78rem; color: #0070F2; white-space: nowrap; }' +
                '.rec-action { padding: 0.3rem 0.6rem; border-radius: 4px; background: #0070F2; color: white; font-size: 0.62rem; font-weight: 600; cursor: pointer; border: none; white-space: nowrap; transition: background 0.2s; }' +
                '.rec-action:hover { background: #0058C6; }' +
            '</style>';

            return new HTML({ content: sHtml });
        }
    });
});