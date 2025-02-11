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

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];;

app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));

apiRouter.use('/auth', authRouter);
apiRouter.use('/posts', postsRouter);
apiRouter.get('/status',(req,res)=>{ return res.json({status:"Server is up"}) })
app.use('/api/v1', apiRouter);
connectdb();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    console.error("Server failed to start:", err);
});