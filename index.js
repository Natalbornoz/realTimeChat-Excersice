// Express se inicializa app para ser un controlador de funciones que puede suministrar a un servidor HTTP(como se ve en la línea 2).
// Definimos un controlador de ruta / que se llama cuando llegamos a nuestro sitio web.
// Hacemos que el servidor http escuche en el puerto 3000.



// var app = require('express')();
// var http = require('http').Server(app);

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

// http.listen(3000, function () {
//     console.log('listening on *:3000');
// });



// Se inicializo una nueva instancia de socket.ioal pasar el objeto http(el servidor HTTP).Luego escucho sobre el connectionevento para los sockets entrantes, y lo registro en la consola.
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

// Para ver si se conecta o desconecta
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

// Para ver el mensanje en la consola
io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
    });
});

// Para enviar un evento a todos
io.emit('some event', { for: 'everyone' });

// Si desea enviar un mensaje a todos excepto a un determinado socket, tenemos la broadcastbandera:
io.on('connection', function (socket) {
    socket.broadcast.emit('hi');
});

// En este caso, en aras de la simplicidad, enviaremos el mensaje a todos, incluido el remitente.
io.on('connection', function (socket) {
        socket.on('chat message', function (msg) {
            io.emit('chat message', msg);
        });
    });

