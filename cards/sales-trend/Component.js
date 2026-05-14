sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/Control"
], function (UIComponent, Control) {
    "use strict";

    var SalesContent = Control.extend("store.ai.card.salestrend.SalesContent", {
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
            var sId = "salesChart_" + this.getId().replace(/[^a-zA-Z0-9]/g, "_");
            oDom.innerHTML = '<div class="sales-trend-container">' +
                '<div class="st-chart-wrap"><canvas id="' + sId + '"></canvas></div>' +
                '<div class="forecast-reason">' +
                    '<span class="forecast-arrow down">\u{1F4C9} \uC2E4\uC801 \uB300\uBE44 -2.1% \uD558\uB77D \uC608\uCE21</span>' +
                    '<span class="forecast-detail">\u{1F4A1} \uADFC\uAC70: \uBD04 \uC2DC\uC98C \uC218\uC694 \uC99D\uAC00 \u00B7 \uCD5C\uADFC \uD310\uB9E4 \uCD94\uC138 \uBC18\uC601</span>' +
                '</div>' +
            '</div>';
            this._renderChart(sId);
        },
        _renderChart: function (sId) {
            var fnRender = function () {
                var canvas = document.getElementById(sId);
                if (!canvas) return;
                var labels = ["04/23", "04/24", "04/25", "04/26", "04/27", "04/28", "04/29", "05/08", "05/09", "05/10", "05/11", "05/12", "05/13", "05/14"];
                var actuals = [10500000, 13800000, 14200000, 16500000, 17200000, 14800000, 13500000, 11000000, null, null, null, null, null, null];
                var forecasts = [null, null, null, null, null, null, null, 11000000, 11200000, 10800000, 10500000, 10600000, 10900000, 11300000];
                new Chart(canvas, {
                    type: "line",
                    data: { labels: labels, datasets: [
                        { label: "\uC2E4\uC801", data: actuals, borderColor: "#0070F2", backgroundColor: "rgba(0,112,242,0.08)", borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: "#0070F2", tension: 0.3, fill: true, spanGaps: false },
                        { label: "AI \uC608\uCE21", data: forecasts, borderColor: "#7B2FF2", backgroundColor: "rgba(123,47,242,0.05)", borderWidth: 2, borderDash: [6, 3], pointRadius: 3, pointBackgroundColor: "#7B2FF2", tension: 0.3, fill: false, spanGaps: false }
                    ]},
                    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { boxWidth: 12, padding: 10, font: { size: 10 } } } }, scales: { y: { beginAtZero: false, ticks: { callback: function (v) { return (v / 10000).toFixed(0) + "\uB9CC"; }, font: { size: 9 } }, grid: { color: "#F0F0F0" } }, x: { grid: { display: false }, ticks: { font: { size: 9 } } } } }
                });
            };
            if (!window.Chart) {
                var script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";
                script.onload = fnRender;
                document.head.appendChild(script);
            } else {
                setTimeout(fnRender, 50);
            }
        },
        _addStyles: function () {
            if (document.getElementById("sales-trend-styles")) return;
            var style = document.createElement("style");
            style.id = "sales-trend-styles";
            style.textContent = [
                '.sales-trend-container { padding: 0.75rem; font-family: "Inter", "72", sans-serif; }',
                '.st-chart-wrap { position: relative; height: 220px; margin-bottom: 0.5rem; }',
                '.st-chart-wrap canvas { width: 100% !important; height: 100% !important; }',
                '.forecast-reason { padding: 0.5rem 0.75rem; background: #F8F9FB; border-radius: 6px; font-size: 0.7rem; line-height: 1.5; border-left: 3px solid #7B2FF2; }',
                '.forecast-arrow { font-weight: 700; }',
                '.forecast-arrow.down { color: #D93025; }',
                '.forecast-arrow.up { color: #188038; }',
                '.forecast-detail { margin-left: 0.75rem; color: #556B82; }'
            ].join('\n');
            document.head.appendChild(style);
        }
    });

    return UIComponent.extend("store.ai.card.salestrend.Component", {
        metadata: { manifest: "json" },
        init: function () { UIComponent.prototype.init.apply(this, arguments); },
        createContent: function () { return new SalesContent(); }
    });
});