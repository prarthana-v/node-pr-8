const express = require("express");
const {
  productPage,
  addProductPage,
  addProducts,
  deleteProduct,
} = require("../controller/productConroller");
const routes = express.Router();
const path = require("path");
const multer = require("multer");

const st = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const file = multer({ storage: st }).single("image");

routes.get("/", productPage);
routes.get("/add", addProductPage);
routes.post("/add", file, addProducts);
routes.get("/delete", deleteProduct);
module.exports = routes;
