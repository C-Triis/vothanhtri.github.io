"use strict";
const mongoose = require('mongoose');

//khai báo Collection 
const Brand = mongoose.Schema(
    {
        brandName: { type: String },
        img_prod: { type:String },
        price_prod: { type: String },
        percent_prod: { type: Number},
        des_prod: { type: String },
        name_prod:{type: String}
    },
    {versionKey: false, timestamps: true}
);

Brand.statics.objectId = function(id) {
    return mongoose.Types.ObjectId(id);
};

//xuất Brand
module.exports = {
    Brand: mongoose.model("brand", Brand)
};