"use strict"
const express = require("express");
const router = express.Router({});
const Product = require('../models/product').Product
const ListOrderController = require("../controllers/listOrder");

router.get("/", (req, res) => {
    let page = req.query.page;
    let keySearch = req.query.keySearch || "";
    if(!page || parseInt(page) <= 0){
        page = 1;
    }
    ListOrderController.getListOrder().then(async rs => {
        res.render("pages/admin/listOrder", {
            listOrder: rs,
        })
    })
})
router.get("/detail/:id", ListOrderController.getStatus)
router.post("/uporder", ListOrderController.upOrder)


module.exports= router