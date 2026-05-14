sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/Control"
], function (UIComponent, Control) {
    "use strict";

    var SCContent = Control.extend("store.ai.card.supplychain.SCContent", {
        metadata: {},
        renderer: function (oRm, oControl) {
            oRm.openStart("div", oControl);
            oRm.openEnd();
            oRm.close("div");
        },
        onAfterRendering: function () {
            var oDom = this.getDomRef();
            if (!oDom) return;
            this._addStyles();
            var sId = "scGraph_" + this.getId().replace(/[^a-zA-Z0-9]/g, "_");
            oDom.innerHTML = '<div class="sc-container">' +
                '<div class="sc-toolbar">' +
                    '<label class="sc-toggle-label"><input type="checkbox" checked> \uC704\uD5D8 \uACBD\uB85C\uB9CC</label>' +
                    '<div class="sc-legend">' +
                        '<span class="sc-legend-item"><span class="sc-legend-dot" style="background:#7C4DFF"></span> \uACF5\uAE09\uC5C5\uCCB4</span>' +
                        '<span class="sc-legend-item"><span class="sc-legend-dot" style="background:#43A047"></span> \uC815\uC0C1</span>' +
                        '<span class="sc-legend-item"><span class="sc-legend-dot" style="background:#FFC107"></span> \uC8FC\uC758</span>' +
                        '<span class="sc-legend-item"><span class="sc-legend-dot" style="background:#D93025"></span> \uBD80\uC871</span>' +
                        '<span class="sc-legend-item"><span class="sc-legend-dot" style="background:#1976D2"></span> \uC810\uD3EC</span>' +
                    '</div>' +
                '</div>' +
                '<div id="' + sId + '" class="sc-graph"></div>' +
            '</div>';
            this._renderNetwork(sId);
        },
        _renderNetwork: function (sId) {
            var fnRender = function () {
                var container = document.getElementById(sId);
                if (!container) return;
                var nodes = new vis.DataSet([
                    { id: "S1", label: "27\uC778\uCE58 \uBAA8\uB2C8\uD130\n(278)", shape: "box", color: { background: "#FFF9C4", border: "#FFC107" }, font: { color: "#333", size: 10 }, margin: 7 },
                    { id: "T1", label: "\u{1F3EA} \uC7A0\uC2E4 \uC9C0\uC810", shape: "box", color: { background: "#E3F2FD", border: "#1976D2" }, font: { color: "#1565C0", size: 11 }, margin: 8 },
                    { id: "T2", label: "\u{1F3EA} \uC885\uB85C \uC9C0\uC810", shape: "box", color: { background: "#E3F2FD", border: "#1976D2" }, font: { color: "#1565C0", size: 11 }, margin: 8 },
                    { id: "T3", label: "\u{1F3EA} \uC5EC\uC758\uB3C4 \uC9C0\uC810", shape: "box", color: { background: "#E3F2FD", border: "#1976D2" }, font: { color: "#1565C0", size: 11 }, margin: 8 },
                    { id: "T4", label: "\u{1F3EA} \uC774\uD0DC\uC6D0 \uC9C0\uC810", shape: "box", color: { background: "#E3F2FD", border: "#1976D2" }, font: { color: "#1565C0", size: 11 }, margin: 8 }
                ]);
                var edges = new vis.DataSet([
                    { from: "S1", to: "T1", color: { color: "#90CAF9" }, arrows: "to", width: 2 },
                    { from: "S1", to: "T2", color: { color: "#90CAF9" }, arrows: "to", width: 1.5 },
                    { from: "S1", to: "T3", color: { color: "#90CAF9" }, arrows: "to", width: 1.5 },
                    { from: "S1", to: "T4", color: { color: "#CE93D8" }, arrows: "to", width: 2 }
                ]);
                var options = { physics: { solver: "forceAtlas2Based", forceAtlas2Based: { gravitationalConstant: -80, centralGravity: 0.01, springLength: 180, springConstant: 0.02 }, stabilization: { iterations: 120 } }, interaction: { hover: true, tooltipDelay: 200 }, layout: { improvedLayout: true } };
                var network = new vis.Network(container, { nodes: nodes, edges: edges }, options);
                network.once("stabilizationIterationsDone", function () { network.moveTo({ scale: 0.7 }); });
            };
            if (!window.vis) {
                var script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/npm/vis-network@9.1.9/standalone/umd/vis-network.min.js";
                script.onload = fnRender;
                document.head.appendChild(script);
            } else {
                setTimeout(fnRender, 50);
            }
        },
        _addStyles: function () {
            if (document.getElementById("sc-styles")) return;
            var style = document.createElement("style");
            style.id = "sc-styles";
            style.textContent = [
                '.sc-container { padding: 0.5rem 0.75rem; font-family: "Inter", "72", sans-serif; }',
                '.sc-toolbar { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; flex-wrap: wrap; }',
                '.sc-toggle-label { display: flex; align-items: center; gap: 0.3rem; cursor: pointer; font-size: 0.7rem; font-weight: 500; color: #556B82; }',
                '.sc-toggle-label input { cursor: pointer; }',
                '.sc-legend { display: flex; align-items: center; gap: 0.6rem; font-size: 0.65rem; color: #8396A8; margin-left: auto; }',
                '.sc-legend-item { display: flex; align-items: center; gap: 0.25rem; }',
                '.sc-legend-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }',
                '.sc-graph { width: 100%; height: 320px; border: 1px solid #EEF1F5; border-radius: 8px; background: #FAFBFC; }'
            ].join('\n');
            document.head.appendChild(style);
        }
    });

    return UIComponent.extend("store.ai.card.supplychain.Component", {
        metadata: { manifest: "json" },
        init: function () { UIComponent.prototype.init.apply(this, arguments); },
        createContent: function () { return new SCContent(); }
    });
});