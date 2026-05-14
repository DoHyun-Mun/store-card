sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/HTML"
], function (UIComponent, HTML) {
    "use strict";

    return UIComponent.extend("store.ai.card.quicklinks.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
        },

        createContent: function () {
            var aLinks = [
                { icon: "🏷️", title: "상품 관리" },
                { icon: "🏪", title: "점포 관리" },
                { icon: "📦", title: "재고 관리" },
                { icon: "📋", title: "발주 관리" },
                { icon: "🔮", title: "수요 예측" },
                { icon: "🚨", title: "이상 탐지" },
                { icon: "🎯", title: "AI 추천" },
                { icon: "👤", title: "고객 관리" }
            ];

            var sItems = aLinks.map(function (link) {
                return '<a class="shortcut-card">' + link.icon + ' ' + link.title + '</a>';
            }).join("");

            var sHtml = '<div class="quick-links-container">' +
                '<div class="shortcut-row">' + sItems + '</div>' +
            '</div>' +
            '<style>' +
                '.quick-links-container { padding: 0.5rem 0.75rem; font-family: "Inter", "72", sans-serif; }' +
                '.shortcut-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.6rem; }' +
                '.shortcut-card { background: #fff; border: 1px solid #E5E8ED; border-radius: 8px; padding: 0.7rem 0.9rem; display: flex; align-items: center; gap: 0.55rem; cursor: pointer; transition: all 0.2s; color: #1D2D3E; font-size: 0.8rem; font-weight: 500; text-decoration: none; }' +
                '.shortcut-card:hover { background: #EBF3FE; color: #0070F2; border-color: #0070F2; transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,112,242,0.1); }' +
            '</style>';

            return new HTML({ content: sHtml });
        }
    });
});