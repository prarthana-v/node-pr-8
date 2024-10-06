const categoryModel = require("../model/catModel");
const subCategoryModel = require("../model/subCatModel");
const escModel = require("../model/extraSubCatModel");
const productModel = require("../model/productModel");
const extrasubcat = require("../model/extraSubCatModel");
const path = require("path");

const productPage = async (req, res) => {
  try {
    console.log("hii");

    const products = await productModel
      .find({})
      .populate("categoryId")
      .populate("subcategoryId")
      .populate("extrasubcategoryId");

    // console.log(products, "products");

    return res.render("products/view_products", {
      products,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addProductPage = async (req, res) => {
  try {
    const category = await categoryModel.find({ status: "active" });
    const subcategory = await subCategoryModel.find({ status: "active" });
    const esc = await extrasubcat.find({ status: "active" });
    // console.log(category, "c", subcategory, "sc", esc, "esc");

    return res.render("products/add_products", {
      category: category,
      subcategory: subcategory,
      esc: esc,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addProducts = async (req, res) => {
  try {
    // console.log(req.body);
    if (!req.file) {
      console.log("Please select an image");
    }
    const { category, subcategory, esc, name, description, price } = req.body;

    await productModel.create({
      categoryId: category,
      subcategoryId: subcategory,
      extrasubcategoryId: esc,
      name: name,
      description: description,
      price: price,
      image: req.file.path,
    });

    return res.redirect("/products/add");
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteProduct = async (req, res) => {
  try {
    console.log(req.query, "hiiu");
    const id = req.query.id;
    await productModel.findByIdAndDelete(id);
    console.log("p deletd");

    return res.redirect("/products");
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = {
  productPage,
  addProductPage,
  addProducts,
  deleteProduct,
};
