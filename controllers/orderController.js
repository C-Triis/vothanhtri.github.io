"use strict";
const Cart = require("../models/cart").Cart;
const User = require("../models/user").User;
const Product = require("../models/product").Product;
const Order = require("../models/order").Order;
const OrderDetail = require("../models/orderDetail").OrderDetail;

function OrderController() {
    const SELF = {

    };
    return {
        checkOut: async (req, res) => {
            try {
                let data = req.body;
                let uId = req.session?.userId;
                data.userId = uId;
                // console.log(data);
                let userInfor = await User.findById(uId).lean();
                if (!userInfor) {
                    return res.json({ s: 404, msg: 'Not found User' })
                }
                return Order.create(data)
                    .then(async rs => {
                        const productList = await Cart.find({ userId: uId }).lean()
                        const dataOrderDetail = []
                        for (let i = 0, ii = productList.length; i < ii; i++) {
                            dataOrderDetail.push({
                                orderId: rs._id,
                                prodPrice: productList[i].prodPrice,
                                quantity: productList[i].quantity,
                                productId: productList[i].productId
                            })
                        }
                        await OrderDetail.insertMany(dataOrderDetail)
                        await Cart.deleteMany({ userId: uId });
                        return res.redirect("/");
                    })
                    .catch(e => {
                        console.log(e);
                    })
            } catch (error) {
                console.log("lỗi không hoạt động", error);
            }
        },
        orderDetail: async (req, res) => {
            try {
                let uId = req.session?.userId;
                let userInfor = await User.findById(uId).lean();
                if (!userInfor) {
                    return res.json({ s: 404, msg: 'Not found User' })
                }
                return
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = new OrderController();