sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/core/HTML"
], function (UIComponent, HTML) {
    "use strict";

    return UIComponent.extend("store.ai.card.salestrend.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
        },

        createContent: function () {
            var sId = "salesChart_" + Math.random().toString(36).substr(2, 9);

            var sHtml = '<div class="sales-trend-container">' +
                '<div class="chart-wrap"><canvas id="' + sId + '"></canvas></div>' +
                '<div class="forecast-reason">' +
                    '<span class="forecast-arrow down">📉 실적 대비 -2.1% 하락 예측</span>' +
                    '<span class="forecast-detail">💡 근거: 봄 시즌 수요 증가 · 최근 판매 추세 반영</span>' +
                '</div>' +
            '</div>' +
            '<style>' +
                '.sales-trend-container { padding: 0.75rem; font-family: "Inter", "72", sans-serif; }' +
                '.sales-trend-container .chart-wrap { position: relative; height: 220px; margin-bottom: 0.5rem; }' +
                '.sales-trend-container canvas { width: 100% !important; height: 100% !important; }' +
                '.forecast-reason { padding: 0.5rem 0.75rem; background: #F8F9FB; border-radius: 6px; font-size: 0.7rem; line-height: 1.5; border-left: 3px solid #7B2FF2; }' +
                '.forecast-arrow { font-weight: 700; }' +
                '.forecast-arrow.down { color: #D93025; }' +
                '.forecast-arrow.up { color: #188038; }' +
                '.forecast-detail { margin-left: 0.75rem; color: #556B82; }' +
            '</style>';

            var oHtml = new HTML({ content: sHtml });

            oHtml.attachAfterRendering(function () {
                setTimeout(function () {
                    var canvas = document.getElementById(sId);
                    if (!canvas) return;

                    // Load Chart.js dynamically
                    if (!window.Chart) {
                        var script = document.createElement("script");
                        script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js";
                        script.onload = function () { renderChart(canvas); };
                        document.head.appendChild(script);
                    } else {
                        renderChart(canvas);
                    }
                }, 100);
            });

            function renderChart(canvas) {
                var labels = ["04/23", "04/24", "04/25", "04/26", "04/27", "04/28", "04/29", "05/08", "05/09", "05/10", "05/11", "05/12", "05/13", "05/14"];
                var actuals = [10500000, 13800000, 14200000, 16500000, 17200000, 14800000, 13500000, 11000000, null, null, null, null, null, null];
                var forecasts = [null, null, null, null, null, null, null, 11000000, 11200000, 10800000, 10500000, 10600000, 10900000, 11300000];
                var confHigh = [null, null, null, null, null, null, null, 12500000, 12800000, 12300000, 12000000, 12100000, 12500000, 13000000];
                var confLow = [null, null, null, null, null, null, null, 9500000, 9600000, 9300000, 9000000, 9100000, 9300000, 9600000];

                new Chart(canvas, {
                    type: "line",
                    data: {
                        labels: labels,
                        datasets: [
                            { label: "실적", data: actuals, borderColor: "#0070F2", backgroundColor: "rgba(0,112,242,0.08)", borderWidth: 2.5, pointRadius: 4, pointBackgroundColor: "#0070F2", tension: 0.3, fill: true, spanGaps: false },
                            { label: "AI 예측", data: forecasts, borderColor: "#7B2FF2", backgroundColor: "rgba(123,47,242,0.05)", borderWidth: 2, borderDash: [6, 3], pointRadius: 3, pointBackgroundColor: "#7B2FF2", tension: 0.3, fill: false, spanGaps: false },
                            { label: "CI-H", data: confHigh, borderColor: "transparent", backgroundColor: "rgba(123,47,242,0.08)", borderWidth: 0, pointRadius: 0, fill: "+1", spanGaps: false },
                            { label: "CI-L", data: confLow, borderColor: "transparent", backgroundColor: "transparent", borderWidth: 0, pointRadius: 0, fill: false, spanGaps: false }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: "bottom",
                                labels: {
                                    boxWidth: 12, padding: 10, font: { size: 10 },
                                    filter: function (i) { return i.text !== "CI-H" && i.text !== "CI-L"; }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: false,
                                ticks: { callback: function (v) { return (v / 10000).toFixed(0) + "만"; }, font: { size: 9 } },
                                grid: { color: "#F0F0F0" }
                            },
                            x: { grid: { display: false }, ticks: { font: { size: 9 } } }
                        }
                    }
                });
            }

            return oHtml;
        }
    });
});