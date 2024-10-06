const categoryModel = require("../model/catModel");
const subCategoryModel = require("../model/subCatModel");
const exSubCatModel = require("../model/extraSubCatModel");
const extrasubcatModel = require("../model/extraSubCatModel");

const exsubcatPage = async (req, res) => {
  console.log("hii ginie");
  const esc = await extrasubcatModel
    .find({})
    .populate("categoryId")
    .populate("subcategoryId");

  // console.log(esc);

  return res.render("extraSubCategory/view_extrasubcat", {
    esc: esc,
  });
};

const escAddPage = async (req, res) => {
  try {
    const category = await categoryModel.find({ status: "active" });
    const subcat = await subCategoryModel.find({ status: "active" });
    // console.log("c", category, "sc", subcat);

    return res.render("extraSubCategory/add_extrasubcat", {
      category: category,
      subcat: subcat,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const ecsAdd = async (req, res) => {
  try {
    // console.log(req.body, "esc");
    const { category, subcategory, extrasubcategory } = req.body;
    const esc = await exSubCatModel.create({
      categoryId: category,
      subcategoryId: subcategory,
      extrasubcategory: extrasubcategory,
    });
    console.log(esc);

    return res.redirect("/extraSubCategory/add");
  } catch (error) {
    console.log(error);
    return false;
  }
};

const escdelete = async (req, res) => {
  try {
    // console.log(req.query, "id");
    const id = req.query.id;
    await exSubCatModel.findByIdAndDelete(id);
    return res.redirect("/extraSubCategory");
  } catch (error) {
    console.log(error);
    return false;
  }
};

const escEditPage = async (req, res) => {
  try {
    // console.log(req.query);
    const id = req.query.id;

    const category = await categoryModel.find({ status: "active" });
    const subcat = await subCategoryModel.find({ status: "active" });
    const single = await extrasubcatModel
      .findById(id)
      .populate("categoryId")
      .populate("subcategoryId");

    // console.log(single, "s", subcat, "sc", category, "c");

    return res.render("extraSubCategory/edit_extrasubcat", {
      category,
      subcat,
      single,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const escUpdate = async (req, res) => {
  try {
    console.log(req.body);

    const { id, category, subcategory, extrasubcategory } = req.body;
    await extrasubcatModel.findByIdAndUpdate(id, {
      categoryId: category,
      subcategoryId: subcategory,
      extrasubcategory: extrasubcategory,
    });
    return res.redirect("/extrasubcategory");
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = {
  exsubcatPage,
  escAddPage,
  ecsAdd,
  escdelete,
  escEditPage,
  escUpdate,
};
