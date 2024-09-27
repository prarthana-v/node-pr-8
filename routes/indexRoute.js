const express = require("express");
const routes = express.Router();

routes.use("/", require("./authRoute"));
routes.use("/forgot", require("./forgotRoute"));
routes.use("/category", require("./catRoute"));

module.exports = routes;
