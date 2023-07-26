"use strict";
const mongoose = require("mongoose");

const Order = mongoose.Schema(
    {
        userId: { type: String },
        fullName: { type: String },
        phone: { type: String },
        address: { type: String },
        totalPrice: { type: Number },
        paymentMethods: { type: String },
        shippingCost: { type: Number}
    },
    {
        version: false, timestamps: true
    }
);

Order.statics.objectId = function (id) {
    return mongoose.Types.objectId(id);
}

module.exports = {
    Order: mongoose.model("order", Order)
};