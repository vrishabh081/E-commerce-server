const express = require("express");
const {register, login, setAddress, getAllUser, getSingleUserData} = require("../controllers/auth");
const requireLogin = require("../middlewares/requireLogIn");
const authRouter = express.Router();


// routes-
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/single-user-detail", requireLogin, getSingleUserData);
authRouter.get("/all-user", getAllUser);
authRouter.patch("/set-address", requireLogin, setAddress);

// exports-
module.exports = authRouter;