const express = require("express");
const {
  addCategory,
  catergoryPage,
  addCategoryPage,
  deleteCategory,
  editCategory,
} = require("../controller/catController");
const routes = express.Router();

routes.get("/", catergoryPage);
routes.get("/add", addCategoryPage);
routes.post("/add", addCategory);
routes.get("/delete", deleteCategory);
routes.get("/edit", editCategory);

module.exports = routes;
