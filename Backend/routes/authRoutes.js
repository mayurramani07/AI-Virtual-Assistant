const express = require('express');
const { logIn, logOut, signUp } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", logIn);
authRouter.get("/logout", logOut);

module.exports = authRouter;


