import { Server } from "socket.io";

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ['http://localhost:5173', 'http://nginx', 'http://frontend', 'http://localhost'],
            methods: ["GET", "POST"]
        }
        , maxHttpBufferSize: 1e8 // 100 MB

    });

    return io;
};

export { initializeSocket };
