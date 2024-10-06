const express = require("express");
const {
  exsubcatPage,
  escAddPage,
  ecsAdd,
  escdelete,
  escEditPage,
  escUpdate,
} = require("../controller/extraSubCatController");
const routes = express.Router();

routes.get("/", exsubcatPage);
routes.get("/add", escAddPage);
routes.post("/add", ecsAdd);
routes.get("/delete", escdelete);
routes.get("/edit", escEditPage);
routes.post("/update", escUpdate);

module.exports = routes;
