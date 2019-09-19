'use strict'

const express = require('express')
const bodyParser = require('body-parser')
/*const sqlite3 = require ('sqlite3')*/
const mongoose = require('mongoose');

const app = express()
const port = process.env.PORT || 3000
const Product = require('./models/product')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/* tests 
app.get('/',(req,res)=>{
    res.send ('<h3>Api rest de prueba</h3>')
})

app.get('/test/',(req,res)=>{

    res.send( { message: 'Hola Mundo' })

})

app.get('/test/:name',(req,res)=>{
    res.send ({ message: `Hola ${req.params.name}` })
})
*/

/* peticiones */
app.get('/api/product', (req, res) => {


    Product.find({}, (err, products) => {

        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!products) return res.status(404).send({ message: `No existen productos` })
        res.status(200).send({ products })
        console.log('peticion get OK')
    })


})

app.get('/api/product/:productId', (req, res) => {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {

        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!product) return res.status(404).send({ message: `El producto no existe` })

        res.status(200).send({ product })

    })

})

app.post('/api/product', (req, res) => {
    /*console.log(req.body)
    res.status(200).send({message: 'El producto se ha recibido correctamente'})
    res.status(404).send({message: 'producto no recibido'})*/
    console.log('POST /api/product')
    console.log(req.body)
    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) => {
        if (err) res.status(500).send({ message: `Error al salvar en la base de datos ${err}` })
        res.status(200).send({ product: productStored })
    })
})

app.put('/api/product/:productId', (req, res) => {
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
        if (err) res.status(500).send({ message: `Error al actualizar el producto ${err}` })
        res.status(200).send({ product: productUpdate })
    })

})

app.delete('/api/product/:productId', (req, res) => {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {

        if (err) res.status(500).send({ message: `Error al borrar el producto ${err}` })

        product.remove(err => {
            if (err) res.status(500).send({ message: `Error al borrar el producto ${err}` })
            res.status(200).send({ message: 'El producto ha sido eliminado' })

        })

    })

})


mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err, res) => {

    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexion a labase de dato establecida.')
    app.listen(port, () => {
        console.log(`API REST corriendo en  http://localhost:${port}`)
    })

})
