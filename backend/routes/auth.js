const express = require("express");
const { Register } = require("../controllers/authController");

const authRouter = express.Router()

authRouter.post('/register', Register )

module.exports = authRouter 