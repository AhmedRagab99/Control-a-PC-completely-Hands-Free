const express = require("express");
const jwt = require("jsonwebtoken");
const Auth = require("../controllers/AuthController");
const AuthRoutes = express.Router();

AuthRoutes.post("/register", Auth.signUp);

AuthRoutes.post("/login", Auth.signIn);

module.exports = AuthRoutes;
