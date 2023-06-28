"use strict"

const Promotion = require('../models/promotion').Promotion


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
                let promotionInfo = await Promotion.findById(promotionId);
                if (!promotionInfo) {
                    return res.json({ s: 404, msg: "Promotion not found" })
                }
                return res.json({ s: 200, data: promotionInfo })
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
                    return res.json({ s: 400, msg: "Promotion not found" });
                }
                delete data._id;
                return Promotion.findByIdAndUpdate(promotionInfo._id, data)
                    .then((rs) => {
                        res.redirect("/admin/promotion/list");
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