import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { connectdb } from './config/mongoose.js'; 
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import http from "http";

import {initializeSocket} from "./config/socket.config.js";
import {SocketEvents} from "./events/io.events.js";

const apiRouter = express.Router();
import {authRouter} from './routes/auth.js';
import {postsRouter} from './routes/posts.js';
import {conversationsRouter} from './routes/conversations.js';

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
