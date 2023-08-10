"use strict"
const Order = require("../models/order").Order

function ListOrderController() {
    const SELF = {
        SIZE: 5,
    };
    return {
        getListOrder: (page, keySearch) => {
            try {
                let skip = (parseInt(page) - 1) * SELF.SIZE;
                let regex = new RegExp(keySearch);
                return Order.find()
                    .skip(skip)
                    .limit(SELF.SIZE)
                    .then( async rs => {
                        return rs
                    })
                    .catch( e => {
                        console.log(e);
                    })
            } catch (error) {
                console.log(error)
            }
        },
        getStatus: async(req, res) => {
            try {
                let data = req.params.id;
                let orderId = await Order.findById(data).lean();
                return res.json({ s: 200, data: orderId})
             } catch (error) {
                 console.log(error);
             }
        },
        upOrder: async (req, res) => {
            try {
               let data = req.body;
               let orderInfo = await Order.findById(data?._id);
               if(!orderInfo) {
                return res.json({ s: 404, msg: "Order mot found"});
               }
               delete data._id;
               return Order.findByIdAndUpdate(orderInfo._id, data)
                .then( rs => {
                    if(rs) {
                        res.redirect("/admin/listorder")
                    }
                })
                .catch(e => {
                    console.log(e);
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = new ListOrderController()