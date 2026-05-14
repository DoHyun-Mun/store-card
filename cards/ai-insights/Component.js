sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/Control"
], function (UIComponent, Control) {
    "use strict";

    var InsightsContent = Control.extend("store.ai.card.aiinsights.InsightsContent", {
        metadata: {},
        renderer: function (oRm, oControl) {
            oRm.openStart("div", oControl);
            oRm.openEnd();
            oRm.close("div");
        },
        onAfterRendering: function () {
            var oDom = this.getDomRef();
            if (!oDom) return;
            oDom.innerHTML = this._getHtml();
            this._addStyles();
        },
        _getHtml: function () {
            var aInsights = [
                { severity: "MEDIUM", title: "\uC7A0\uC2E4 \uC9C0\uC810 customerCount \uAE09\uC99D \uAC10\uC9C0 (+26)", desc: "\uC2E4\uC801: 46 / \uC608\uCE21: 20 (Z-Score: 8.7)", m1l: "\uC2E4\uC801\uAC74", m1v: "46", m2l: "Z-SCORE", m2v: "8.7", action: "\uC0C1\uC138 \uBD84\uC11D \uBCF4\uAE30" },
                { severity: "MEDIUM", title: "\uAC15\uB0A8 \uBCF8\uC810 revenue \uAE09\uC99D \uAC10\uC9C0 (+934346)", desc: "\uC2E4\uC801: 1684346 / \uC608\uCE21: 750000 (Z-Score: 8.3)", m1l: "\uC2E4\uC801\uAC12", m1v: "1684346", m2l: "Z-SCORE", m2v: "8.3", action: "\uC0C1\uC138 \uBD84\uC11D \uBCF4\uAE30" },
                { severity: "LOW", title: "AI \uBC1C\uC8FC \uCD94\uCC9C 25\uAC74 \uB300\uAE30 \uC911", desc: "\uCD1D \uCD94\uCC9C \uC218\uB7C9: 3771\uAC1C, HIGH 5\uAC74 \uD3EC\uD568", m1l: "\uCD94\uCC9C \uAC74\uC218", m1v: "25\uAC74", m2l: "\uCD1D \uC218\uB7C9", m2v: "3771\uAC1C", action: "\uBC1C\uC8FC \uCD94\uCC9C \uAC80\uD1A0" },
                { severity: "HIGH", title: "\uC11C\uCD08 \uC9C0\uC810 '\uB178\uD2B8\uBD81 \uC5D0\uC5B4 13' \uACB0\uD488 \uC784\uBC15", desc: "\uD604\uC7AC\uACE0 17\uAC1C, 7\uC77C \uC608\uCE21\uC218\uC694 172\uAC1C", m1l: "\uD604\uC7AC\uACE0", m1v: "17\uAC1C", m2l: "\uC608\uCE21\uC218\uC694(7\uC77C)", m2v: "172\uAC1C", action: "\uC989\uC2DC \uBC1C\uC8FC \uCD94\uCC9C \uBCF4\uAE30" },
                { severity: "HIGH", title: "\uAC15\uB0A8 \uBCF8\uC810 '\uB178\uD2B8\uBD81 \uC5D0\uC5B4 13' \uACB0\uD488 \uC784\uBC15", desc: "\uD604\uC7AC\uACE0 13\uAC1C, 7\uC77C \uC608\uCE21\uC218\uC694 218\uAC1C", m1l: "\uD604\uC7AC\uACE0", m1v: "13\uAC1C", m2l: "\uC608\uCE21\uC218\uC694(7\uC77C)", m2v: "218\uAC1C", action: "\uC989\uC2DC \uBC1C\uC8FC \uCD94\uCC9C \uBCF4\uAE30" }
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
                    '<a class="insight-action">' + it.action + ' \u2192</a>' +
                '</div>';
            }).join("");
            return '<div class="ai-insights-container"><div class="ai-insights-row">' + sCards + '</div></div>';
        },
        _addStyles: function () {
            if (document.getElementById("ai-insights-styles")) return;
            var style = document.createElement("style");
            style.id = "ai-insights-styles";
            style.textContent = [
                '.ai-insights-container { padding: 0.5rem 0.75rem; font-family: "Inter", "72", sans-serif; }',
                '.ai-insights-row { display: flex; gap: 0.6rem; overflow-x: auto; padding-bottom: 0.5rem; }',
                '.ai-insights-row::-webkit-scrollbar { height: 4px; }',
                '.ai-insights-row::-webkit-scrollbar-thumb { background: #E5E8ED; border-radius: 4px; }',
                '.ai-insight-card { min-width: 260px; max-width: 300px; flex-shrink: 0; background: #fff; border-radius: 12px; padding: 0.85rem 1rem; border-left: 4px solid #E5E8ED; box-shadow: 0 1px 4px rgba(29,45,62,0.06); transition: all 0.2s; }',
                '.ai-insight-card:hover { box-shadow: 0 4px 16px rgba(29,45,62,0.08); transform: translateY(-1px); }',
                '.ai-insight-card.severity-HIGH { border-left-color: #D93025; }',
                '.ai-insight-card.severity-MEDIUM { border-left-color: #E37400; }',
                '.ai-insight-card.severity-LOW { border-left-color: #188038; }',
                '.insight-badge { display: inline-block; font-size: 0.6rem; font-weight: 700; padding: 0.15rem 0.45rem; border-radius: 4px; text-transform: uppercase; margin-bottom: 0.35rem; }',
                '.insight-badge.HIGH { background: #FCE8E6; color: #D93025; }',
                '.insight-badge.MEDIUM { background: #FEF3E0; color: #E37400; }',
                '.insight-badge.LOW { background: #E6F4EA; color: #188038; }',
                '.insight-title { font-size: 0.78rem; font-weight: 600; margin-bottom: 0.3rem; line-height: 1.3; color: #1D2D3E; }',
                '.insight-desc { font-size: 0.7rem; color: #556B82; margin-bottom: 0.4rem; line-height: 1.4; }',
                '.insight-metrics { display: flex; gap: 1rem; margin-bottom: 0.4rem; }',
                '.insight-metric { display: flex; flex-direction: column; }',
                '.insight-metric-label { font-size: 0.58rem; color: #8396A8; text-transform: uppercase; }',
                '.insight-metric-value { font-size: 0.75rem; font-weight: 700; color: #1D2D3E; }',
                '.insight-action { font-size: 0.68rem; color: #0070F2; font-weight: 600; cursor: pointer; text-decoration: none; }',
                '.insight-action:hover { text-decoration: underline; }'
            ].join('\n');
            document.head.appendChild(style);
        }
    });

    return UIComponent.extend("store.ai.card.aiinsights.Component", {
        metadata: { manifest: "json" },
        init: function () { UIComponent.prototype.init.apply(this, arguments); },
        createContent: function () { return new InsightsContent(); }
    });
});