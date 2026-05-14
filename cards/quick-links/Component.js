sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/Control"
], function (UIComponent, Control) {
    "use strict";

    var LinksContent = Control.extend("store.ai.card.quicklinks.LinksContent", {
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
            var aLinks = [
                { icon: "\u{1F3F7}\uFE0F", title: "\uC0C1\uD488 \uAD00\uB9AC" },
                { icon: "\u{1F3EA}", title: "\uC810\uD3EC \uAD00\uB9AC" },
                { icon: "\u{1F4E6}", title: "\uC7AC\uACE0 \uAD00\uB9AC" },
                { icon: "\u{1F4CB}", title: "\uBC1C\uC8FC \uAD00\uB9AC" },
                { icon: "\u{1F52E}", title: "\uC218\uC694 \uC608\uCE21" },
                { icon: "\u{1F6A8}", title: "\uC774\uC0C1 \uD0D0\uC9C0" },
                { icon: "\u{1F3AF}", title: "AI \uCD94\uCC9C" },
                { icon: "\u{1F464}", title: "\uACE0\uAC1D \uAD00\uB9AC" }
            ];
            var sItems = aLinks.map(function (link) {
                return '<a class="shortcut-card">' + link.icon + ' ' + link.title + '</a>';
            }).join("");
            return '<div class="quick-links-container"><div class="shortcut-row">' + sItems + '</div></div>';
        },
        _addStyles: function () {
            if (document.getElementById("quick-links-styles")) return;
            var style = document.createElement("style");
            style.id = "quick-links-styles";
            style.textContent = [
                '.quick-links-container { padding: 0.5rem 0.75rem; font-family: "Inter", "72", sans-serif; }',
                '.shortcut-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.6rem; }',
                '.shortcut-card { background: #fff; border: 1px solid #E5E8ED; border-radius: 8px; padding: 0.7rem 0.9rem; display: flex; align-items: center; gap: 0.55rem; cursor: pointer; transition: all 0.2s; color: #1D2D3E; font-size: 0.8rem; font-weight: 500; text-decoration: none; }',
                '.shortcut-card:hover { background: #EBF3FE; color: #0070F2; border-color: #0070F2; transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,112,242,0.1); }'
            ].join('\n');
            document.head.appendChild(style);
        }
    });

    return UIComponent.extend("store.ai.card.quicklinks.Component", {
        metadata: { manifest: "json" },
        init: function () { UIComponent.prototype.init.apply(this, arguments); },
        createContent: function () { return new LinksContent(); }
    });
});