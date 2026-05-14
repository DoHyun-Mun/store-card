sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("store.ai.card.kpisummary.Card", {
		onInit: function () {
			var oModel = new JSONModel({
				revenue: "\u20A91.8\uC5B5",
				healthScore: "72\uC810",
				stockoutRisk: "192\uAC74",
				pendingOrders: "14\uAC74"
			});
			this.getView().setModel(oModel);
		}
	});
});