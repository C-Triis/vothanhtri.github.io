"use strict";
const mongoose = require("mongoose");

const OrderDetail = mongoose.Schema(
    {
        orderId: { type: String },
        priceOrDetail: { type: String },
        quantity: { type: String },
        productId: { type: Array }
    },
    { version: false, timestamps: true }
);

OrderDetail.statics.objectId = function(id) {
    return mongoose.Types.objectId(id);
}

module.exports = {
    OrderDetail: mongoose.model("orderDetail", OrderDetail),
};