sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/HTML"
], function (UIComponent, HTML) {
    "use strict";

    return UIComponent.extend("store.ai.card.supplychain.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
        },

        createContent: function () {
            var sId = "scGraph_" + Math.random().toString(36).substr(2, 9);

            var sHtml = '<div class="sc-container">' +
                '<div class="sc-toolbar">' +
                    '<label class="sc-toggle-label"><input type="checkbox" checked id="' + sId + '_toggle"> 위험 경로만</label>' +
                    '<div class="sc-legend">' +
                        '<span class="sc-legend-item"><span class="sc-legend-dot" style="background:#7C4DFF;"></span> 공급업체</span>' +
                        '<span class="sc-legend-item"><span class="sc-legend-dot" style="background:#43A047;"></span> 정상</span>' +
                        '<span class="sc-legend-item"><span class="sc-legend-dot" style="background:#FFC107;"></span> 주의</span>' +
                        '<span class="sc-legend-item"><span class="sc-legend-dot" style="background:#D93025;"></span> 부족</span>' +
                        '<span class="sc-legend-item"><span class="sc-legend-dot" style="background:#1976D2;"></span> 점포</span>' +
                    '</div>' +
                '</div>' +
                '<div id="' + sId + '" class="sc-graph"></div>' +
            '</div>' +
            '<style>' +
                '.sc-container { padding: 0.5rem 0.75rem; font-family: "Inter", "72", sans-serif; }' +
                '.sc-toolbar { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; flex-wrap: wrap; }' +
                '.sc-toggle-label { display: flex; align-items: center; gap: 0.3rem; cursor: pointer; font-size: 0.7rem; font-weight: 500; color: #556B82; }' +
                '.sc-toggle-label input { cursor: pointer; }' +
                '.sc-legend { display: flex; align-items: center; gap: 0.6rem; font-size: 0.65rem; color: #8396A8; margin-left: auto; }' +
                '.sc-legend-item { display: flex; align-items: center; gap: 0.25rem; }' +
                '.sc-legend-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }' +
                '.sc-graph { width: 100%; height: 320px; border: 1px solid #EEF1F5; border-radius: 8px; background: #FAFBFC; }' +
            '</style>';

            var oHtml = new HTML({ content: sHtml });

            oHtml.attachAfterRendering(function () {
                setTimeout(function () {
                    var container = document.getElementById(sId);
                    if (!container) return;

                    // Load vis-network dynamically
                    if (!window.vis) {
                        var script = document.createElement("script");
                        script.src = "https://cdn.jsdelivr.net/npm/vis-network@9.1.9/standalone/umd/vis-network.min.js";
                        script.onload = function () { renderNetwork(container); };
                        document.head.appendChild(script);
                    } else {
                        renderNetwork(container);
                    }
                }, 100);
            });

            function renderNetwork(container) {
                // Sample supply chain data matching the screenshot
                var nodes = new vis.DataSet([
                    { id: "S1", label: "27인치 모니터\n(278)", shape: "box", color: { background: "#FFF9C4", border: "#FFC107" }, font: { color: "#333", size: 10 }, margin: 7 },
                    { id: "T1", label: "🏪 잠실 지점", shape: "box", color: { background: "#E3F2FD", border: "#1976D2" }, font: { color: "#1565C0", size: 11 }, margin: 8 },
                    { id: "T2", label: "🏪 종로 지점", shape: "box", color: { background: "#E3F2FD", border: "#1976D2" }, font: { color: "#1565C0", size: 11 }, margin: 8 },
                    { id: "T3", label: "🏪 여의도 지점", shape: "box", color: { background: "#E3F2FD", border: "#1976D2" }, font: { color: "#1565C0", size: 11 }, margin: 8 },
                    { id: "T4", label: "🏪 이태원 지점", shape: "box", color: { background: "#E3F2FD", border: "#1976D2" }, font: { color: "#1565C0", size: 11 }, margin: 8 }
                ]);

                var edges = new vis.DataSet([
                    { from: "S1", to: "T1", color: { color: "#90CAF9" }, arrows: "to", width: 2 },
                    { from: "S1", to: "T2", color: { color: "#90CAF9" }, arrows: "to", width: 1.5 },
                    { from: "S1", to: "T3", color: { color: "#90CAF9" }, arrows: "to", width: 1.5 },
                    { from: "S1", to: "T4", color: { color: "#CE93D8" }, arrows: "to", width: 2 }
                ]);

                var data = { nodes: nodes, edges: edges };
                var options = {
                    physics: {
                        solver: "forceAtlas2Based",
                        forceAtlas2Based: { gravitationalConstant: -80, centralGravity: 0.01, springLength: 180, springConstant: 0.02 },
                        stabilization: { iterations: 120 }
                    },
                    interaction: { hover: true, tooltipDelay: 200 },
                    layout: { improvedLayout: true }
                };

                var network = new vis.Network(container, data, options);
                network.once("stabilizationIterationsDone", function () {
                    network.moveTo({ scale: 0.7 });
                });
            }

            return oHtml;
        }
    });
});