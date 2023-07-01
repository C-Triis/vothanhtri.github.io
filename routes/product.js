"use strict";

const express = require('express');
const router = express.Router({});
const ProductController = require('../controllers/producController.js');
const BrandController = require('../controllers/brandController.js');
const UserController = require('../controllers/userController.js')
const multer = require("multer");
const fileService = require('../services/fileService.js');
const upload = multer({
  storage: multer.memoryStorage(),
});

// router.use(UserController.checkLogin);
// router.get('/list', ProductController.getList);
router.get("/list", (req, res) => {
    let page = req.query.page;
    let keySearch = req.query.keySearch || "";
    if (!page || parseInt(page) <= 0) {
        page = 1;
    }
    ProductController.getList(page, keySearch).then(rs =>{
        BrandController.getListBrand().then((brandList) => {
            res.render('pages/admin/index', {
                product: rs,
                brand: brandList,
            })
        })
    })
});
router.get("/list", (req, res) => {
    let page = req.query.page;
    let keySearch = req.query.keySearch || "";
    if (!page || parseInt(page) <= 0) {
        page = 1;
    }
    ProductController.userSearch(page, keySearch).then(rs =>{
        BrandController.getListDB().then((brandList) => {
            res.render('pages/admin/index', {
                product: rs,
                brand: brandList,
            })
        })
    })
});

router.post("/add", ProductController.addProduct);
router.get("/detail/:id", ProductController.getProductDetail);
router.post("/edit", ProductController.editProduct);
router.delete("/delete/:id", ProductController.DeleteProduct)
router.post("/upload-image", upload.single("file"), fileService.uploadFile)

module.exports = router;