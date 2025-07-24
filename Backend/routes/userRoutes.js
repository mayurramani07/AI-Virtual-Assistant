const express = require('express');
const { getCurrentUser } = require('../controllers/userController');
const isAuth = require("../middlewares/isAuth");

const userRouter = express.Router();

userRouter.get("/current", isAuth,getCurrentUser)

module.exports = userRouter;


