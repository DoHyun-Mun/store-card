sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("store.ai.card.aiinsights.Card", {
		onInit: function () {
			var oModel = new JSONModel({
				insights: [
					{
						severity: "MEDIUM",
						title: "잠실 지점 customerCount 급증 감지 (+26)",
						description: "실적: 46 / 예측: 20 (Z-Score: 8.7)"
					},
					{
						severity: "HIGH",
						title: "서초 지점 노트북 에어 13 결품 임박",
						description: "현재고 17개, 7일 예측수요 172개"
					}
				]
			});
			this.getView().setModel(oModel);
		}
	});
});