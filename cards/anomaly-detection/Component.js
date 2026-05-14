sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/Control"
], function (UIComponent, Control) {
    "use strict";

    var AnomalyContent = Control.extend("store.ai.card.anomalydetection.AnomalyContent", {
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
            var aAnomalies = [
                { store: "\uAC15\uB0A8 \uBCF8\uC810", metric: "revenue", zScore: "8.3", deviation: "934346", type: "SPIKE" },
                { store: "\uC11C\uCD08 \uC9C0\uC810", metric: "quantity", zScore: "-3.0", deviation: "-15", type: "DROP" },
                { store: "\uC7A0\uC2E4 \uC9C0\uC810", metric: "customerCount", zScore: "8.7", deviation: "26", type: "SPIKE" },
                { store: "\uC5EC\uC758\uB3C4 \uC9C0\uC810", metric: "profit", zScore: "-4.7", deviation: "-124667", type: "DROP" },
                { store: "\uD64D\uB300 \uC9C0\uC810", metric: "revenue", zScore: "-3.4", deviation: "-280540", type: "SPIKE" }
            ];
            var sItems = aAnomalies.map(function (it) {
                var icon = it.type === "SPIKE" ? "\u{1F4C8}" : "\u{1F4C9}";
                return '<div class="anom-item">' +
                    '<div class="anom-icon">' + icon + '</div>' +
                    '<div class="anom-info"><div class="anom-title">' + it.store + ' ' + it.metric + '</div><div class="anom-sub">Z:' + it.zScore + ' | Dev:' + it.deviation + '</div></div>' +
                    '<span class="anom-badge ' + it.type + '">' + it.type + '</span>' +
                '</div>';
            }).join("");
            return '<div class="anomaly-container"><div class="anomaly-list">' + sItems + '</div></div>';
        },
        _addStyles: function () {
            if (document.getElementById("anomaly-styles")) return;
            var style = document.createElement("style");
            style.id = "anomaly-styles";
            style.textContent = [
                '.anomaly-container { padding: 0.5rem 0.75rem; font-family: "Inter", "72", sans-serif; }',
                '.anomaly-list { max-height: 280px; overflow-y: auto; }',
                '.anom-item { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem; border-bottom: 1px solid #EEF1F5; font-size: 0.75rem; transition: background 0.2s; }',
                '.anom-item:hover { background: #F5F6FA; }',
                '.anom-item:last-child { border-bottom: none; }',
                '.anom-icon { font-size: 1.1rem; flex-shrink: 0; }',
                '.anom-info { flex: 1; min-width: 0; }',
                '.anom-title { font-weight: 600; font-size: 0.75rem; color: #1D2D3E; }',
                '.anom-sub { font-size: 0.65rem; color: #8396A8; }',
                '.anom-badge { font-size: 0.6rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px; }',
                '.anom-badge.SPIKE { background: #E6F4EA; color: #2E7D32; }',
                '.anom-badge.DROP { background: #FFEBEE; color: #C62828; }'
            ].join('\n');
            document.head.appendChild(style);
        }
    });

    return UIComponent.extend("store.ai.card.anomalydetection.Component", {
        metadata: { manifest: "json" },
        init: function () { UIComponent.prototype.init.apply(this, arguments); },
        createContent: function () { return new AnomalyContent(); }
    });
});