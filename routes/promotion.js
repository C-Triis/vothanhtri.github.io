"use strict";

const express = require('express');
const router = express.Router({});
const PromotionController = require('../controllers/promotionController');
const ProductController = require('../controllers/producController')
const Product = require('../models/product').Product
const Promotion = require('../models/promotion').Promotion
const DateServices = require('../services/date')

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
      let Promotion = rs[0]
      let Products = rs[1]
        for(let i=0, ii=Promotion.length;i<ii; i++) {
            let productIds=Promotion[i].productIds
           let products =await Product.find({_id: {$in: productIds}}).lean()
           Products[i]['promo'] = Promotion.indexOf(Products[i]._id.toString())  > -1 ? true : false
           let productList = products.map(product => product.name_prod)
           Promotion[i]['productList'] = productList.join(', ')
           Promotion[i]['start'] =`${DateServices.getStrDate(
            "DD/MM/YYYY",
            new Date(Promotion[i].start_date)
          )} ${DateServices.getStrTime(
            "SS:MM:HH",
            new Date(Promotion[i].start_date)
          )}`
          Promotion[i]['end'] =`${DateServices.getStrDate(
            "DD/MM/YYYY",
            new Date(Promotion[i].end_date)
          )} ${DateServices.getStrTime(
            "SS:MM:HH",
            new Date(Promotion[i].end_date)
          )}`
        }
        res.render("pages/admin/promotion", {
            Promotion: rs[0],
            Products: rs[1]
        })
    })
});

router.post("/add", PromotionController.addPromotion);
router.get("/detail/:id", PromotionController.getPromotionDetail);
router.post("/edit", PromotionController.editPromotion);
router.delete("/delete/:id", PromotionController.deletePromotion);


module.exports = router