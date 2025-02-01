require('dotenv').config()
const { config } = require('dotenv');
const express  = require("express");
const connectdb = require('./config/mongoose');
const authRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use(cookieParser()) ;
app.use(express.urlencoded({extended:true}));
app.use("/api",authRouter);
connectdb();

app.listen(3000);