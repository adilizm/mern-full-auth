const { Server } = require("socket.io");

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ['http://localhost:5173', 'http://nginx', 'http://frontend', 'http://localhost'],
            methods: ["GET", "POST"]
        }
    });

    return io;
};

module.exports = initializeSocket;
