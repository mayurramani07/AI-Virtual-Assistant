const express = require('express')

import {logIn, logOut, signUp} from "../controllers/authController.js"
const authRouter = express.Router();


authRouter.post("/signup",signUp)
authRouter.post("/signin",logIn)
authRouter.get("/logout",logOut)

export default authRouter


