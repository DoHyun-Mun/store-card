sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/Control"
], function (UIComponent, Control) {
    "use strict";

    var HealthContent = Control.extend("store.ai.card.storehealth.HealthContent", {
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
            var aStores = [
                { name: "\uCC9C\uC548 \uC2E0\uBD80\uC810", score: 66, status: "YELLOW", alerts: 8 },
                { name: "\uBA85\uB3D9 \uC9C0\uC810", score: 67, status: "YELLOW", alerts: 8 },
                { name: "\uC11C\uCD08 \uC9C0\uC810", score: 69, status: "YELLOW", alerts: 7 },
                { name: "\uC5EC\uC758\uB3C4 \uC9C0\uC810", score: 69, status: "YELLOW", alerts: 6 },
                { name: "\uD64D\uB300 \uC9C0\uC810", score: 69, status: "YELLOW", alerts: 8 },
                { name: "\uBD80\uC0B0 \uC11C\uBA74\uC810", score: 69, status: "YELLOW", alerts: 10 },
                { name: "\uC7A0\uC2E4 \uC9C0\uC810", score: 70, status: "YELLOW", alerts: 4 },
                { name: "\uC885\uB85C \uC9C0\uC810", score: 70, status: "YELLOW", alerts: 7 },
                { name: "\uC778\uCC9C \uC1A1\uB3C4\uC810", score: 70, status: "YELLOW", alerts: 5 },
                { name: "\uAD11\uC8FC \uCDA9\uC7A5\uB85C\uC810", score: 70, status: "YELLOW", alerts: 6 },
                { name: "\uC804\uC8FC \uC7AC\uC2DC\uC810", score: 70, status: "YELLOW", alerts: 6 },
                { name: "\uC2E0\uCD0C \uC9C0\uC810", score: 71, status: "YELLOW", alerts: 3 },
                { name: "\uBD80\uC0B0 \uD574\uC6B4\uB300\uC810", score: 71, status: "YELLOW", alerts: 8 },
                { name: "\uB3D9\uB300\uBB38 \uC9C0\uC810", score: 72, status: "GREEN", alerts: 3 },
                { name: "\uB300\uC804 \uB458\uC0B0\uC810", score: 72, status: "GREEN", alerts: 12 },
                { name: "\uCCAD\uC8FC \uC0C1\uB2F9\uC810", score: 72, status: "GREEN", alerts: 7 },
                { name: "\uC774\uD0DC\uC6D0 \uC9C0\uC810", score: 73, status: "GREEN", alerts: 5 },
                { name: "\uAC15\uB0A8 \uBCF8\uC810", score: 74, status: "GREEN", alerts: 5 },
                { name: "\uACE0\uC591 \uC77C\uC0B0\uC810", score: 74, status: "GREEN", alerts: 8 },
                { name: "\uCC3D\uC6D0 \uC0C1\uB0A8\uC810", score: 74, status: "GREEN", alerts: 7 },
                { name: "\uC6B8\uC0B0 \uC0BC\uC0B0\uC810", score: 75, status: "GREEN", alerts: 5 },
                { name: "\uB300\uAD6C \uB3D9\uC131\uB85C\uC810", score: 76, status: "GREEN", alerts: 6 },
                { name: "\uC218\uC6D0 \uC778\uACC4\uC810", score: 77, status: "GREEN", alerts: 5 },
                { name: "\uC6A9\uC778 \uC218\uC9C0\uC810", score: 78, status: "GREEN", alerts: 8 },
                { name: "\uD3EC\uD56D \uBD81\uAD6C\uC810", score: 78, status: "GREEN", alerts: 6 },
                { name: "\uC81C\uC8FC \uC5F0\uB3D9\uC810", score: 79, status: "GREEN", alerts: 6 },
                { name: "\uC131\uB0A8 \uBD84\uB2F9\uC810", score: 83, status: "GREEN", alerts: 4 }
            ];
            var sItems = aStores.map(function (s) {
                var icon = s.status === "GREEN" ? "\u{1F7E2}" : s.status === "YELLOW" ? "\u{1F7E1}" : "\u{1F534}";
                var alertText = s.alerts > 0 ? "\u26A0\uFE0F " + s.alerts + "\uAC74" : "\u2705 \uC815\uC0C1";
                return '<div class="sh-item ' + s.status + '">' +
                    '<div class="sh-icon">' + icon + '</div>' +
                    '<div class="sh-score">' + s.score + '\uC810</div>' +
                    '<div class="sh-name">' + s.name + '</div>' +
                    '<div class="sh-sub">' + alertText + '</div>' +
                '</div>';
            }).join("");
            return '<div class="store-health-container"><div class="store-health-grid">' + sItems + '</div></div>';
        },
        _addStyles: function () {
            if (document.getElementById("store-health-styles")) return;
            var style = document.createElement("style");
            style.id = "store-health-styles";
            style.textContent = [
                '.store-health-container { padding: 0.5rem 0.75rem; font-family: "Inter", "72", sans-serif; }',
                '.store-health-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 0.4rem; max-height: 320px; overflow-y: auto; padding: 0.3rem; }',
                '.store-health-grid::-webkit-scrollbar { width: 4px; }',
                '.store-health-grid::-webkit-scrollbar-thumb { background: #E5E8ED; border-radius: 4px; }',
                '.sh-item { text-align: center; padding: 0.5rem 0.3rem; border-radius: 8px; border: 1px solid #EEF1F5; cursor: pointer; transition: all 0.2s; }',
                '.sh-item:hover { box-shadow: 0 2px 8px rgba(29,45,62,0.08); transform: scale(1.02); }',
                '.sh-item.GREEN { background: #E8F5E9; }',
                '.sh-item.YELLOW { background: #FFF8E1; }',
                '.sh-item.RED { background: #FFEBEE; }',
                '.sh-icon { font-size: 1.1rem; }',
                '.sh-score { font-size: 0.72rem; font-weight: 700; color: #1D2D3E; }',
                '.sh-name { font-size: 0.62rem; font-weight: 600; margin-top: 0.15rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #1D2D3E; }',
                '.sh-sub { font-size: 0.55rem; color: #8396A8; margin-top: 0.1rem; }'
            ].join('\n');
            document.head.appendChild(style);
        }
    });

    return UIComponent.extend("store.ai.card.storehealth.Component", {
        metadata: { manifest: "json" },
        init: function () { UIComponent.prototype.init.apply(this, arguments); },
        createContent: function () { return new HealthContent(); }
    });
});