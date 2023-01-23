import express from 'express'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import ContenedorSQL from './contenedores/ContenedorSQL.js'

import config from './config.js'

//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorSQL(config.mariaDb, 'productos')
const mensajesApi = new ContenedorSQL(config.sqlite3, 'messages')

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {

    //productos
    let products = await productosApi.listarAll()
    socket.emit('productos', products)
    
    socket.on('producto', datat =>{
        productosApi.guardar(datat)

        io.sockets.emit('productos', products)
    })


     //mensajes
     socket.emit('messages', mensajesApi.listarAll())
    
     socket.on('message', data =>{
         mensajesApi.guardar(data)
        
         io.sockets.emit('messages', mensajesApi.listarAll())
     })

});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))