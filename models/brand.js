"use strict";
const mongoose = require('mongoose');

//khai báo Collection 
const Brand = mongoose.Schema(
    {
        brandName: { type: String },
        img_brand: { type:String },
        des_brand: { type: String },
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