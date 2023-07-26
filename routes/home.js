"use strict";

const express = require('express');
const router = express.Router({});
const ProductController = require('../controllers/productController.js');
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
router.get("/chart", (req, res) => {
      res.render("pages/auth/chart.ejs", {
      })
});

// router.get("/register", (req, res) => {
//   res.render("pages/admin/register");
// });
// router.get("/verifyUser", (req, res) => {
//   res.render("pages/admin/verify");
// });

// router.get("/confirm", (req, res) => {
//   res.render("pages/admin/reset");
// });

// router.post("/register", UserController.register);
// router.post("/verify", UserController.verify);
// router.post("/login", UserController.login);
// router.post("/confirm", UserController.confirm);

module.exports = router;