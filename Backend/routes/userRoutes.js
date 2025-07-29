const express = require('express');
const { getCurrentUser, updateAssistant } = require('../controllers/userController');
const isAuth = require("../middlewares/isAuth");
const upload = require('../middlewares/multer');

const userRouter = express.Router();

userRouter.get("/current", isAuth,getCurrentUser)
userRouter.post("/update",isAuth ,upload.single("assistantImage"),updateAssistant)

module.exports = userRouter;


