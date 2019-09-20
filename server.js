'use strict'

/*const sqlite3 = require ('sqlite3')*/
const mongoose = require('mongoose')
const app = require ('./app')
const config = require ('./config')




mongoose.connect(config.db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true}, (err, res) => {

    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexion a labase de dato establecida.')
    app.listen(config.port, () => {
        console.log(`API REST corriendo en  http://localhost:${config.port}`)
    })

})
