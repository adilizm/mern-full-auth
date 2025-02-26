require('dotenv').config();
const express = require("express");
const connectdb = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const http = require("http");

const initializeSocket = require("./config/socket.config");
const SocketEvents = require("./events/io.events");

const apiRouter = express.Router();
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const conversationsRouter = require('./routes/conversations');

const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(cors({
    origin: ['http://localhost:5173', 'http://nginx', 'http://frontend', 'http://localhost'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

apiRouter.use('/auth', authRouter);
apiRouter.use('/posts', postsRouter);
apiRouter.use('/conversation', conversationsRouter);
apiRouter.get('/status', (req, res) => res.json({ status: "Server is up" }));

app.use('/api', apiRouter);

connectdb();

SocketEvents(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
}).on('error', (err) => {
    console.error("Server failed to start:", err);
});
