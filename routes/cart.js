'use strict'
const express = require('express');
const router = express.Router({});
const CartController = require('../controllers/cartController')
const OrderController = require('../controllers/orderController')

router.get("/cart", CartController.getCheckCart);
router.post('/cart/add', CartController.addCart);
router.delete('/cart/delete', CartController.deleteCart);
router.delete('/cart/deleteall/:id', CartController.deleteAll);
router.post('/cart/order', OrderController.checkOut);

module.exports = router;