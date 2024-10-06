const express = require("express");
const {
  subCatPage,
  addSubCatPage,
  addSubCat,
  deleteSubcat,
} = require("../controller/subCatController");
const routes = express.Router();

routes.get("/", subCatPage);
routes.get("/add", addSubCatPage);
routes.post("/add", addSubCat);
routes.get("/delete", deleteSubcat);

module.exports = routes;
