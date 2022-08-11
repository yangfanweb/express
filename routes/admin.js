const express = require("express");
const router = express.Router();
const adminController = require('../controllers/admin')
// const productsController = require("./../controllers/product.js");
// const products = [];
router.get("/add-product", adminController.getAddProduct);



router.get('/products',adminController.getProducts)

router.post("/add-product", adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct)

router.post('/edit-product', adminController.postEditProduct)

router.post('/delete-product',adminController.postDeleteProduct)
module.exports = router
// exports.products = products;
