const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

//Importa os módulos FREAMEWORKS
const app = require('express')();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(express.static('public'));

//Rota para a pág principal
app.get('/', (req,res) => res.sendFile(__dirname + '/index.html'));

//Evento para quando o usuário conectar ao servidor
io.on('connection', (socket) => {
    console.log('Usuário conectado')

    //Evento para quando envia uma msg
    socket.on('chat message', (data) => io.emit('chat message', data));

    //Evento para quando usuário desconecta
    socket.on('disconnect', () => console.log('Usuário desconectado'));
});

//Iniciar o servidor
http.listen(3000, () => {
    console.log(`Servidor rodando - Link http://localhost:3000`)
});




  
 