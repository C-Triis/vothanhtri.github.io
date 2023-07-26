'use strict'

const Cart = require('../models/cart').Cart;
const Product = require('../models/product').Product;
const User = require('../models/user').User;

function CartController() {
    const SELF = {
    };
    return {
        getCheckCart: async (req, res) => {
            try {
                let uId = req.session?.userId;   
                let userInfor = await User.findById(uId).lean();
                if(!userInfor) {
                    return res.json({ s: 404, msg: 'Not found User'})
                }
                return Cart.find({ userId: uId}).lean().then( async rs => {
                    let sumPrice = 0;
                    for(let i = 0, ii = rs.length; i < ii; i++) {
                        let productId = rs[i].productId
                        let productInfor = await Product.findOne({_id: { $in: productId }}).lean();
                        rs[i]['productName'] = productInfor.name_prod;
                        rs[i]['productImg'] = productInfor.img_prod; 
                        rs[i]['productPrice'] = productInfor.price_prod;
                        rs[i]['productPercent'] = productInfor.percent_prod / 100;
                        // console.log(rs);

                        sumPrice += (( rs[i].productPrice * rs[i].quantity) - (rs[i].productPrice * rs[i].productPercent * rs[i].quantity));
                    }
                    console.log(rs);
                    return res.render('pages/auth/cart', {
                        product: rs,
                        sumPrice: sumPrice
                    })
                })
            } catch (error) {
                console.log(error);
            }
        },
        addCart: async (req, res) => {
            try {
                let prodId = req.query?.productId;
                let uId = req.session?.userId
                // console.log(prodId, uId); 
                //Todo:
                /**
                 * Cart: userId, productId, qty, price
                 * Cart.find({userid: userId, productId:productId})
                 * 
                 */
                //get productInfor
               let productInfor = await Product.findById(prodId).lean()
               if(!productInfor) {
                return res.json({s:404,msg:"Product not found"})
               }
                //kiểm tra
                let cartUser = await Cart.findOne({ userId: uId, productId: prodId }).lean()
                if (!cartUser) {
                    let data = {
                        productId: prodId,
                        userId: uId,
                        prodPrice: productInfor.price_prod,
                        quantity: 1
                    };
                    console.log("data Product",data);
                    return Cart.create(data)
                        .then(rs => {
                            console.log("Add cart success!");
                            return res.redirect('pages/auth/cart')
                        })
                        .catch(e => {
                            console.log('error', e);
                        })
                } else {
                    let upQuantity = cartUser.quantity + 1;
                    return Cart.findByIdAndUpdate(cartUser._id, { quantity: upQuantity})
                        .then(rs => {
                            return res.json({ s: 200, msg: "thêm hàng thành công" })
                        })
                        .catch(e => {
                            console.log('Error add Product', e);
                        })
                }
            } catch (error) {
                console.log('lỗi addCart', error);
            }
        },
        deleteCart: async (req, res) => {
            try {
                let prodId = req.query?.productId;
                let uId = req.session?.userId;
                let productInfor = await Product.findById(prodId).lean()
                if(!productInfor) {
                 return res.json({s:404,msg:"Product not found"})
                }
                let cartUser = await Cart.findOne({ userId: uId, productId: prodId }).lean()
                if(cartUser){
                    let upQuantity = cartUser.quantity - 1;
                    if(upQuantity > 0){
                        return Cart.findByIdAndUpdate(cartUser._id, { quantity: upQuantity})
                        .then(rs => {
                            return res.json({ s: 200, msg: "xóa hàng thành công" })
                        })
                        .catch(e => {
                            console.log('Error add Product', e);
                        })
                    } else {
                        return Cart.deleteOne(cartUser._id)
                            .then((rs) => {
                                console.log(rs);
                                return res.json({ s: 200, msg: "Delete product success!!!"})
                            })
                            .catch((error) => {
                                console.log(error);
                                return rs.json({ s: 404, msg: "Delete product fail"})
                            })
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
        deleteAll: async (req, res) => {
            try {
                let cartId = req.params?.id;
                let cart = await Cart.findById(cartId).lean()
                console.log(cartId);
                return Cart.deleteOne({ _id: cartId })
                    .then( rs => {
                        return res.json({ s: 200, msg: "Delete product success!!!"})
                    })
                    .catch( e => {
                        console.log(e);
                    })
            } catch (error) {
                console.log(e);
            }
        }
    }
}

module.exports = new CartController();