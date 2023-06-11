"use strict";

const express = require('express');
const router = express.Router({});
const BrandController = require('../controllers/brandController.js');

// router.get('/list', BrandController.getList);
router.get("/list", (req, res) => {
    BrandController.getList().then(rs =>{
        res.render("pages/auth/nike_user", {
            brand: rs,
        })
    })
  });

router.post("/add", BrandController.addBrand);
router.get("/detail/:id", BrandController.getBrandDetail);
router.post("/edit", BrandController.editBrand);
router.delete("/delete/:id", BrandController.DeleteBrand)


module.exports = router;