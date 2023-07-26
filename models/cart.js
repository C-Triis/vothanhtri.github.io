'use strict';
const mongoose = require('mongoose');

const Cart = mongoose.Schema(
    {
        productId: {type: Object},
        userId: {type: String},
        prodPrice: {type: String},
        quantity: {type: Number}
    },
    {version: false, timestamps: true}
);

Cart.statics.objectId = function(id) {
    return mongoose.Types.objectId(id);
}

module.exports = {
    Cart: mongoose.model('cart', Cart)
}