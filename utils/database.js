const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-jsplusplus',
    password: 'yf123456'
})

module.exports = pool.promise()