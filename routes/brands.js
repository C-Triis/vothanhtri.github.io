"use strict";

const express = require('express');
const router = express.Router({});
const BrandController = require('../controllers/brandController.js');
const multer = require("multer");
const fileService = require('../services/fileService.js');
const upload = multer({
    storage: multer.memoryStorage(),
});

// router.get('/list', BrandController.getList);
router.get("/list", (req, res) => {
    BrandController.getList().then(rs => {
        res.render("pages/admin/brand", {
            brand: rs,
        })
    })
});
router.get("/home", (req, res) => {
    BrandController.getList().then(rs => {
        res.render("pages/auth/brand_user", {
            brand: rs,
        })
    })
});


router.post("/add", BrandController.addBrand);
router.get("/detail/:id", BrandController.getBrandDetail);
router.post("/edit", BrandController.editBrand);
router.delete("/delete/:id", BrandController.DeleteBrand)
router.post("/upload-image", upload.single("file"), fileService.uploadFile);

module.exports = router;