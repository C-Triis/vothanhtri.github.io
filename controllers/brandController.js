"use strict";
const Brand = require('../models/brand.js').Brand
function BrandController() {
    const SELF = {
      SIZE: 5,
    };
    return{
        getList: (page, keySearch) => {
          try {
            let skip = (parseInt(page) - 1) * SELF.SIZE;
            let regex = new RegExp(keySearch);
            return Brand.find()
              .skip(skip)
              .limit(SELF.SIZE)
              .then((rs) => {
                return rs
              })
              .catch((error) => {
              });
          } catch (error) {
            console.log(error);
          }
          },
          addBrand: (req, res) => {
            try {
              let data = req.body;
              console.log(data);
              return Brand.create(data)
                .then((rs) => {
                  return res.redirect("/product/list");
                })
                .catch((err) => {
                  res.send({ s: 400, msg: err });
                });
            } catch (error) {
              console.log(error);
            }
          },
          getListDB: () => {
            try {
              return new Promise((resolve, reject) => {
                Brand.find()
                  .then((rs) => {
                    resolve(rs);
                  })
                  .catch((err) => {
                    console.log(err);
                    reject(err);
                  });
              });
            } catch (error) {
              console.log(error);
            }
          },
          getBrandDetail: async (req, res) => {
            try {
              let brandId = req.params?.id;
              let brandInfo = await Product.findById(brandId);
              if (!brandInfo) {
                return res.json({ s: 404, msg: "Brand not found" });
              }
              return res.json({ s: 200, data: brandInfo });
            } catch (error) {
              console.log(error);
            }
          },
          editBrand: async (req, res) => {
            try {
              let data = req.body;
              let brandInfo = await Brand.findById(data?._id);
              if (!brandInfo) {
                return res.json({ s: 404, msg: "Brand not found" });
              }
              delete data._id;
              return Brand.findByIdAndUpdate(brandInfo._id, data)
                .then((rs) => {
                  if (rs) {
                    res.redirect("/brand/list");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } catch (error) {
              console.log(error);
            }
          },
          DeleteBrand: async (req, res) => {
            try {
              console.log("qưe");
              const brandId = req.params?.id;
              console.log(brandId);
              const brandInfo = await Brand.findById(brandId);
              if (!brandInfo) {
                return res.json({ s: 404, msg: "Brand not found" });
              }
              Brand.deleteOne({ _id: brandId })
                .then((rs) => {
                  console.log(rs);
                  return res.json({ s: 200, msg: "Delete Brand success!!" });
                })
                .catch((e) => {
                  console.log(`DeleteBrand - fail: ${e}`);
                  return rs.json({ s: 400, msg: "Delete Brand fail" });
                });
            } catch (error) {
              console.log(error);
            }
          },
          
    }
}

//xuất ProductController
module.exports = new BrandController();