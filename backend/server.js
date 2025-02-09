require('dotenv').config()
const express = require("express");
const connectdb = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
var cors = require('cors')

const apiRouter = express.Router();
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const app = express();

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const ALLOWD_OROGINS = ['http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(cors({ origin: ALLOWD_OROGINS, credentials: true }));

apiRouter.use('/auth', authRouter);
apiRouter.use('/posts', postsRouter);
app.use('/api/v1', apiRouter);
connectdb();

app.listen(3000);