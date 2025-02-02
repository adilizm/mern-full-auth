require('dotenv').config()
const express  = require("express");
const connectdb = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
 

const apiRouter = express.Router();
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const app = express();

app.use(express.json());
app.use(cookieParser()) ;
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

apiRouter.use('/auth', authRouter);
apiRouter.use('/posts', postsRouter);
app.use('/api/v1', apiRouter);
connectdb();

app.listen(3000);