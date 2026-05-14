sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("store.ai.card.orderrecommendation.Card", {
		onInit: function () {
			var oModel = new JSONModel({});
			this.getView().setModel(oModel);
		}
	});
});