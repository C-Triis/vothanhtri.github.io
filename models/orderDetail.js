"use strict";
const mongoose = require("mongoose");

const OrderDetail = mongoose.Schema(
    {
        orderId: { type: String },
        prodPrice: { type: String },
        quantity: { type: String },
        productId: { type: String }
    },
    { version: false, timestamps: true }
);

OrderDetail.statics.objectId = function(id) {
    return mongoose.Types.objectId(id);
}

module.exports = {
    OrderDetail: mongoose.model("orderDetail", OrderDetail),
};