
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
// const expressHbs = require('express-handlebars')
// const http = require('http')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const app = express() 
const errorController = require('./controllers/error')
// app.engine('hbs',expressHbs({layoutDir:'views/layout', defaultLayout:'main-layout',extname:'hbs'}))
// 导入数据库
const db = require('./utils/database')

// 测试代码
// db.execute('SELECT * FROM products').then(result => { 
//     console.log(result)
// }).catch((err) => { 
//     console.log(err)
// })
app.set('view engine','ejs')
// app.set('view engine','hbs')
// app.set('view engine','pug')
app.set('views','views')


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use('/admin',adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)


// app.use('/add-product',(req,res,next)=>{
//     res.send('<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">提交</button></form>')
// })

// app.use('/product',(req,res,next)=>{
//     console.log(req.body)
//     res.redirect('/')
// })

// app.use('/',(req,res,next)=>{
//     res.send('<h1>hello express</h1>')
// })

// const server = http.createServer(app)

// server.listen(3000,()=>{
//     console.log('3000端口已经启动')
// })
app.listen(3001, () => { 
    console.log('3001端口已经启动')
})

