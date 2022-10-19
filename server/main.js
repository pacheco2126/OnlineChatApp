var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mensajes = [{
    autor: "Borja Ponga",
    texto: "Bienvenido a la aplicación de chat."
}]

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.status(200).send("Prueba de socket.io");
});

io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('mensajes', mensajes);

    socket.on('nuevoMensaje', function(datos) {
        mensajes.push(datos);
        io.sockets.emit('mensajes', mensajes);
        io.sockets.emit('mensaje', mensajes[0]);
    });
    
});

server.listen(8081, function(){
    console.log('Servidor corriendo en http://localhost:8081');
});