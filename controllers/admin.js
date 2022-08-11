// const products = [];
// 类
const Product = require('../models/product')
exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(__dirname,'../','views','add-product.html'))
    res.render("admin/edit-product", {
      pageTitle: "添加商品",
      path: "/admin/add-product",
      editing:false,
      productCSS: true,
      isAddProductActive: true,
      formCSS: true,
    });
}
  
exports.postAddProduct = (req, res, next) => {
  // console.log(req.body);
  const { title,imageUrl,price,description } = req.body
  const product = new Product(null,title,imageUrl,price,description)
  product.save()
  res.redirect("/");
}
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit  // true
  // console.log(editMode)
  if (!editMode) { 
    return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findById(prodId, (product) => {
    if (!product) { 
      return res.redirect('/')
    }
    res.render("admin/edit-product", {
      pageTitle: "编辑产品",
      path: "/admin/edit-product",
      editing: editMode,
      product:product
    });
  })
}
exports.postEditProduct = (req, res, next) => { 
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDesc = req.body.description
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDesc)
  updatedProduct.save()
  res.redirect('/admin/products')
}
exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "管理商品",
      path: "/admin/products",
      hasProducts: products.length > 0,
      hasProducts: true,
      isShowActive: true,
      productCSS: true,
    });
   })
  // console.log(adminData.products);
  // res.sendFile(path.join(__dirname,'../','views','shop.html'))
}

exports.postDeleteProduct = (req, res, next) => { 
  console.log(1111)
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}


