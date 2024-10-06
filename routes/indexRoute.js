const express = require("express");
const routes = express.Router();

routes.use("/", require("./authRoute"));
routes.use("/forgot", require("./forgotRoute"));
routes.use("/category", require("./catRoute"));
routes.use("/subCategory", require("./subCatRoute"));
routes.use("/extraSubCategory", require("../routes/extraSubCatRoute"));
routes.use("/products", require("./productRoute"));

module.exports = routes;
