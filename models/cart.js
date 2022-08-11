// 定义购物车模型
const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json')
module.exports = class Cart {
    static addProduct(id,productPrice) { 
        // 1.获取之前的购物车
        fs.readFile(p, (err, fileContent) => { 
            let cart = {
                products: [],
                totalPrice: 0
            }
            if (!err) { 
                cart = JSON.parse(fileContent)
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct
            if (existingProduct) {
                updatedProduct = { ...existingProduct }
                updatedProduct.quantity = updatedProduct.quantity + 1
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else { 
                updatedProduct = { id: id, quantity: 1 }
                cart.products = [...cart.products,updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice
            fs.writeFile(p, JSON.stringify(cart), (err) => { 
                console.log(err)
            })
        })
        // 2. 分析购物车--> 找到已经存在的产品
        // 3.添加产品 /增加产品的数量
    }

    static deleteProduct(id,productPrice) { 
        fs.readFile(p, (err, fileContent) => {
            if (err) { 
                return
            }
            const updateCart = { ...JSON.parse(fileContent) }
            const product = updateCart.products.find(prod => prod.id === id)
            if (!product) { 
                return
            }
            const productQuantity = product.quantity
            updateCart.products = updateCart.products.filter(prod => prod.id !== id)
            updateCart.totalPrice = (updateCart.totalPrice - +(productPrice * productQuantity)).toFixed(2)

            fs.writeFile(p, JSON.stringify(updateCart), err => { 
                console.log(err)
            })
         })
    }
    static getCart(cb) { 
        fs.readFile(p, (err, fileContent) => { 
            let cart = {
                products: [],
                totalPrice: 0
            }
            if (!err) {
                cart = JSON.parse(fileContent)
                cb(cart)
            } else { 
                cb(null)
            }
        })
    }

}