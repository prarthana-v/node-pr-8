const express = require("express");
const routes = express.Router();
const passport = require("passport");
const {
  login,
  register,
  registerUser,
  dashboard,
  loginUser,
} = require("../controller/authControlller");

routes.get("/", login);
routes.get("/register", register);
routes.post("/registerUser", registerUser);
routes.post(
  "/loginUser",
  passport.authenticate("local", { failureRedirect: "/register" }),
  loginUser
);
routes.get("/dashboard", dashboard);

module.exports = routes;
