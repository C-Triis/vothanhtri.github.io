"use strict";

const express = require('express');
const router = express.Router({});
const PromotionController = require('../controllers/promotionController');


router.get("/list", (req, res) => {
    let page = req.query.page;
    let keySearch = req.query.keySearch || "";
    if(!page || parseInt(page) <= 0) {
        page = 1;
    }

    PromotionController.getList(page, keySearch)
        .then((rs) => {
            res.render("pages/admin/promotion",{
                promotion: rs
            })
        })
});

router.post("/add", PromotionController.addPromotion);
router.get("/detail/:id", PromotionController.getPromotionDetail);
router.post("/edit", PromotionController.editPromotion);
router.delete("/delete/:id", PromotionController.deletePromotion);


module.exports = router