'use strict'

const express = require ('express')
const bodyParser = require ('body-parser')
/*const sqlite3 = require ('sqlite3')*/

const app = express()
const port = process.env.PORT || 3000

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
app.get('/api/product',(req,res)=>{
    console.log('peticion get OK')
    res.status(200).send({products:[]})

})

app.get('/api/product/:productId',(req,res)=>{
    
})

app.post('/api/product',(req,res)=>{
    console.log(req.body)
    res.status(200).send({message: 'El producto se ha recibido correctamente'})
    //res.status(404).send({message: 'producto no recibido'})
})

app.put('/api/product/:productId',(req,res)=>{

})

app.delete('/api/product/:productId',(req,res)=>{

})



app.listen(port,()=>{
    console.log(`API REST corriendo en  http://localhost:${port}`)
})