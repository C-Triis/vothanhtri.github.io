"use strict";

const express = require('express');
const router = express.Router({});
const ProductController = require('../controllers/productController.js');
const PromotionController = require("../controllers/promotionController.js")
// const UserController = require('../controllers/userController.js');
const multer = require("multer");
const fileService = require('../services/fileService.js');
const upload = multer({
  storage: multer.memoryStorage(),
});

// router.get("/product/list", ProductController.getList);
// router.post("/product/add", ProductController.addProduct);
// router.get("/product/detail/:id", ProductController.getProductDetail);
// router.post("/product/edit", ProductController.editProduct);
router.post("/upload-image", upload.single("file"), fileService.uploadFile);
// router.delete("/product/delete/:id", ProductController.DeleteProduct)

router.get("/", (req, res) => {
  ProductController.getList().then(rs =>{
      res.render("pages/auth/home_user", {
          product: rs,
      })
  })
});

router.get("/brand", (req, res) => {
  ProductController.getListDB().then(rs =>{
    res.render("pages/auth/brand_menu", {
        rs: rs,
    })
})
})

router.get("/detail/:id", ProductController.getProd)

router.get("/promotion",(req, res) => {
  PromotionController.getList().then( rs=>{
    res.render("pages/auth/promotion", {
      prom: rs
    })
  })
})

module.exports = router;