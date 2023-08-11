require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const tmi = require('tmi.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

const client = new tmi.Client({
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_BOT_TOKEN
    },
    channels: [process.env.TWITCH_CHANNEL]
});

client.connect();

var paddleA = 200;
var paddleB = 200;

client.on('message', (channel, tags, message, self) => {
    if (message.toLowerCase() === '!upa') paddleA -= 10;
    if (message.toLowerCase() === '!downa') paddleA += 10;
    if (message.toLowerCase() === '!upb') paddleB -= 10;
    if (message.toLowerCase() === '!downb') paddleB += 10;

    io.emit('updatePaddles', { paddleA: paddleA, paddleB: paddleB });
});

io.on('connection', (client) => {
    client.on('controllerAction', (action) => {
        if (action === 'upa') paddleA -= 10;
        if (action === 'downa') paddleA += 10;
        // Add more conditions for other actions

        io.emit('updatePaddles', { paddleA: paddleA, paddleB: paddleB });
    });
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));

