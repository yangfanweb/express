const path = require("path");
const express = require("express");
const shopController = require('../controllers/shop')
const router = express.Router();
const adminData = require("./admin");
// const router = require("./admin");
router.get("/", shopController.getIndex);
router.get('/products', shopController.getProducts)
router.get('/products/:productId',shopController.getProduct)
router.get('/cart', shopController.getCart)

router.post('/cart', shopController.postCart)
router.get('checkout', shopController.getCheckout)

router.get('/orders', shopController.getOrders)

router.post('/cart-delete-item',shopController.postCartDeleteProduct)


module.exports = router;
