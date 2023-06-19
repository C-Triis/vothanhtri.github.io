"use strict"
const mongoose =require("mongoose");

const Promotion = mongoose.Schema(
    {
        promo_name: { type: String},
        promo_percent: {type: String},
        start_date: {type: String},
        end_date: {type: String},
        productIds: {type: Array},
        promo_des: {type: String}
    },
    { versionKey: false, timestamps: true }
);

Promotion.statics.objectId = function (id) {
    return mongoose.Types.ObjectId(id);
};

module.exports = {
    Promotion: mongoose.model("promotion", Promotion),
};