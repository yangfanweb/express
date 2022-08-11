const Product = require("../models/product");
const Cart = require('../models/cart')
exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "所有商品",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
    const products = Product.fetchAll((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "商店",
        path: "/",
      });
    });
};
  

exports.getCart = (req, res, next) => { 
  Cart.getCart(cart => { 
    Product.fetchAll((products) => {
      const cartProducts = []
      for (product of products) { 
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData) { 
          cartProducts.push({productData:product,quantity: cartProductData.quantity})
        }
      }
      res.render("shop/cart", {
        pageTitle: "购物车",
        path: '/cart',
        products:cartProducts
      })
     })
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => { 
    Cart.addProduct(prodId,product.price)
  })
  res.redirect('/cart')
}

exports.getProduct = (req, res, next) => { 
  const prodId = req.params.productId
  Product.findById(prodId, product => { 
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path:'/products'
    })
  })
  // res.redirect('/')
}

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        path: '/checkout',
        pageTitle:"结算页面"
    })
}
 
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
      path: '/orders',
      pageTitle:"我的订单"
  })
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => { 
    Cart.deleteProduct(prodId, product.price)
    res.redirect("/cart")
  })
 }


  