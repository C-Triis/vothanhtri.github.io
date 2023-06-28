"use strict";

const express = require('express');
const router = express.Router({});
const PromotionController = require('../controllers/promotionController');
const ProductController = require('../controllers/producController')
const Product =require('../models/product').Product
router.get("/list", (req, res) => {
    let page = req.query.page;
    let keySearch = req.query.keySearch || "";
    if (!page || parseInt(page) <= 0) {
        page = 1;
    }
    Promise.all([
        PromotionController.getList(page, keySearch),
        Product.find().lean()
    ]).then(async rs => {
        for(let i=0, ii=rs[0].length;i<ii; i++) {
            let productIds=rs[0][i].productIds
           let products =await Product.find({_id: {$in: productIds}}).lean()
           let productList = products.map(product => product.name_prod)
           rs[0][i]['productList'] =productList.join(', ')
        }
        res.render("pages/admin/promotion", {
            promotion: rs[0],
            list: rs[1]
        })
    })
});

router.post("/add", PromotionController.addPromotion);
router.get("/detail/:id", PromotionController.getPromotionDetail);
router.post("/edit", PromotionController.editPromotion);
router.delete("/delete/:id", PromotionController.deletePromotion);


module.exports = router