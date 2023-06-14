"use strict"

const Promotion = require('../models/promotion').Promotion

function PromotionController() {
    const SELF = {};
    return {
        getList: (page, keySearch) => {
            try{
                let regex = new RegExp(keySearch);
                return Promotion.find()
                .then((rs) => {
                    return rs
                })
                .catch((error) => {
                    console.log(error);
                })
            } catch(error) {
                console.log(error);
            }
        },
        addPromotion: (req, res) => {
            try {
                let data = req.body;
                console.log(data);
                return Promotion.create(data)
                .then((rs) => {
                    return res.redirect("/promotion/list");
                })
                .catch((error) => {
                    res.send({s: 400, msg: error})
                })
            } catch (error) {
                console.log(error);
            }
        },
        getListDB: () => {
            try{
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
            } catch(error) {
                console.log(error);
            }
        },
        getPromotionDetil: async(req, res) =>{
            try {
                let promotionId = req.params?.id;
                let promotionInfo = await Promotion.findById(promotionId);
                if(!promotionInfo) {
                    return res.json({s: 404, msg: "Promotion not found"})
                }
                return res.json({s: 200, data: promotionInfo})
            }
            catch(error) {
                console.log(error);
            }
        },
        editPromotion: async (req, res) => {
            let data = req.body;
            
        }
    }
}


module.exports = new PromotionController();