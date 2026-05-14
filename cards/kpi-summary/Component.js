sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/Control"
], function (UIComponent, Control) {
    "use strict";

    var KPIContent = Control.extend("store.ai.card.kpisummary.KPIContent", {
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
            return '<div class="kpi-row">' +
                '<div class="kpi-card">' +
                    '<div class="kpi-icon-wrap" style="background:#EBF3FE;color:#0070F2">\u{1F4B0}</div>' +
                    '<div class="kpi-body">' +
                        '<span class="kpi-value">\u20A91.8\uC5B5</span>' +
                        '<span class="kpi-label">\uCD5C\uADFC \uB9E4\uCD9C</span>' +
                        '<span class="kpi-change down">\u2193 \uC804\uC77C \uB300\uBE44 -0.7%</span>' +
                    '</div>' +
                '</div>' +
                '<div class="kpi-card">' +
                    '<div class="kpi-icon-wrap" style="background:#E6F4EA;color:#188038">\u{1F3E5}</div>' +
                    '<div class="kpi-body">' +
                        '<span class="kpi-value">72\uC810</span>' +
                        '<span class="kpi-label">\uC7AC\uACE0 \uAC74\uC804\uC131</span>' +
                        '<span class="kpi-change down">\u2193 3</span>' +
                    '</div>' +
                '</div>' +
                '<div class="kpi-card">' +
                    '<div class="kpi-icon-wrap" style="background:#FCE8E6;color:#D93025">\u{1F6A8}</div>' +
                    '<div class="kpi-body">' +
                        '<span class="kpi-value">192\uAC74</span>' +
                        '<span class="kpi-label">\uACB0\uD488 \uC704\uD5D8</span>' +
                        '<span class="kpi-sublabel">\uC989\uC2DC \uC870\uCE58 \u2192</span>' +
                    '</div>' +
                '</div>' +
                '<div class="kpi-card kpi-highlight">' +
                    '<div class="kpi-icon-wrap" style="background:#FEF3E0;color:#E37400">\u{1F4CB}</div>' +
                    '<div class="kpi-body">' +
                        '<span class="kpi-value">14\uAC74</span>' +
                        '<span class="kpi-label">\uBC1C\uC8FC \uB300\uAE30</span>' +
                        '<span class="kpi-sublabel">\uC2B9\uC778 \uD544\uC694 \u2192</span>' +
                    '</div>' +
                '</div>' +
            '</div>';
        },
        _addStyles: function () {
            if (document.getElementById("kpi-summary-styles")) return;
            var style = document.createElement("style");
            style.id = "kpi-summary-styles";
            style.textContent = [
                '.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.6rem; padding: 0.75rem; font-family: "Inter", "72", sans-serif; }',
                '.kpi-card { background: #fff; border: 1px solid #E5E8ED; border-radius: 12px; padding: 1rem 1.15rem; display: flex; align-items: center; gap: 0.85rem; box-shadow: 0 1px 4px rgba(29,45,62,0.06); transition: all 0.2s; cursor: pointer; }',
                '.kpi-card:hover { box-shadow: 0 4px 16px rgba(29,45,62,0.08); transform: translateY(-2px); border-color: #0070F2; }',
                '.kpi-card.kpi-highlight { border: 2px solid #D93025; background: #FFF8F7; }',
                '.kpi-icon-wrap { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }',
                '.kpi-body { display: flex; flex-direction: column; }',
                '.kpi-value { font-size: 1.35rem; font-weight: 700; line-height: 1.2; color: #1D2D3E; }',
                '.kpi-label { font-size: 0.7rem; font-weight: 500; color: #8396A8; margin-top: 0.1rem; }',
                '.kpi-change { font-size: 0.68rem; font-weight: 600; margin-top: 0.15rem; }',
                '.kpi-change.up { color: #188038; }',
                '.kpi-change.down { color: #D93025; }',
                '.kpi-sublabel { font-size: 0.62rem; color: #8396A8; margin-top: 0.1rem; }',
                '@media (max-width: 600px) { .kpi-row { grid-template-columns: repeat(2, 1fr); } }'
            ].join('\n');
            document.head.appendChild(style);
        }
    });

    return UIComponent.extend("store.ai.card.kpisummary.Component", {
        metadata: { manifest: "json" },
        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
        },
        createContent: function () {
            return new KPIContent();
        }
    });
});