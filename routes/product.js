"use strict";

const express = require('express');
const router = express.Router({});
const ProductController = require('../controllers/producController.js');
const UserController = require('../controllers/userController.js')


// router.use(UserController.checkLogin);
// router.get('/list', ProductController.getList);
router.get("/list", (req, res) => {
    let page = req.query.page;
    let keySearch = req.query.keySearch || "";
    if (!page || parseInt(page) <= 0) {
        page = 1;
    }
    ProductController.getList(page, keySearch).then(rs =>{
        res.render("pages/admin/index", {
            product: rs,
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
        res.render("pages/admin/index", {
            product: rs,
        })
    })
});

router.post("/add", ProductController.addProduct);
router.get("/detail/:id", ProductController.getProductDetail);
router.post("/edit", ProductController.editProduct);
router.delete("/delete/:id", ProductController.DeleteProduct)


module.exports = router;