"use strict";
const mongoose = require('mongoose');

//khai báo Collection 
const Product = mongoose.Schema(
    {
        name_prod: { type: String },
        img_prod: { type:String },
        price_prod: { type: String },
        percent_prod: { type: String},
        des_prod: { type: String },
        brandName: {type: String }
    },
    {versionKey: false, timestamps: true}
);

Product.statics.objectId = function(id) {
    return mongoose.Types.ObjectId(id);
};

//xuất product
module.exports = {
    Product: mongoose.model("product", Product)
};