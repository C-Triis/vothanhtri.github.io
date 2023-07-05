"use strict"

const Promotion = require('../models/promotion').Promotion
const Product = require('../models/product').Product


function PromotionController() {
    const SELF = {
        SIZE: 10,
    };
    return {
        getList:  (page, keySearch) => {
            try {
                let regex = new RegExp(keySearch);
                return Promotion.find()
                    .then( async(rs) => {
                        return rs
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error);
            }
        },
        addPromotion: (req, res) => {
            try {
                let data = req.body;
                console.log(data);
                return Promotion.create(data)
                    .then((rs) => {
                        return res.redirect("/admin/promotion/list");
                    })
                    .catch((error) => {
                        res.send({ s: 400, msg: error })
                    })
            } catch (error) {
                console.log(error);
            }
        },
        getListDB: () => {
            try {
                return new Promise((resolve, reject) => {
                    Promotion.find()
                        .then((rs) => {
                            resolve(rs);
                        })
                        .catch((error) => {
                            console.log(error);
                            reject(error);
                        })
                })
            } catch (error) {
                console.log(error);
            }
        },
        getPromotionDetail: async (req, res) => {
            try {
                let promotionId = req.params?.id;
                return Promise.all([
                    Promotion.findById(promotionId).lean(),
                    Product.find().lean()
                ]).then( rs => {
                    if(!rs[0]){
                        return res.json({ s: 404, msg: 'Promotion not found'})
                    };
                    let promotionInfo = rs[0], products = rs[1]
                    for (let i = 0, ii = products.length; i < ii; i++) {
                        products[i]['isExist'] = promotionInfo.productIds.indexOf(products[i]._id.toString()) > -1 ? true : false
                    }
                    return res.json({ s: 200, data: { promo: promotionInfo, products: products } });
                })
                
            }
            catch (error) {
                console.log(error);
            }
        },
        editPromotion: async (req, res) => {
            try {
                let data = req.body;
                let promotionInfo = await Promotion.findById(data?._id);
                if (!promotionInfo) {
                    return res.json({ s: 404, msg: "Promotion not found" });
                }
                delete data._id;
                return Promotion.findByIdAndUpdate(promotionInfo._id, data)
                    .then((rs) => {
                        if(rs){
                            res.redirect("/admin/promotion/list");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
            catch (error) {
                console.log(error);
            }
        },
        deletePromotion: async(req, res) => {
            try{
                const promotionId = req.params?.id;
                // console.log(promotionId);
                const promotionInfo = await Promotion.findById(promotionId);
                if(!promotionInfo) {
                    return res.json({ s: 404, msg: "Promotion not found"})
                }
                Promotion.deleteOne({_id: promotionId})
                    .then((rs) => {
                        return res.json({ s: 200, msg: "Delete promotion success!!!"})
                    })
                    .catch((error) => {
                        console.log(error);
                        return rs.json({ s: 404, msg: "Delete promotion fail"})
                    })
            }
            catch(error) {
                console.log(error);
            }
        },
    }
}


module.exports = new PromotionController();