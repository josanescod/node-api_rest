'use strict'

const express = require('express')
const bodyParser = require('body-parser')
/*const sqlite3 = require ('sqlite3')*/
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000
const productCtrl = require('./controllers/product')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/* peticiones */
app.get('/api/product',productCtrl.getProducts)
app.get('/api/product/:productId', productCtrl.getProduct)
app.post('/api/product', productCtrl.saveProduct)
app.put('/api/product/:productId', productCtrl.updateProduct)
app.delete('/api/product/:productId', productCtrl.deleteProduct)


mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, res) => {

    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexion a labase de dato establecida.')
    app.listen(port, () => {
        console.log(`API REST corriendo en  http://localhost:${port}`)
    })

})
