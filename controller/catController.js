const catModel = require("../model/catModel");

const catergoryPage = async (req, res) => {
  try {
    const category = await catModel.find({});
    return res.render("category/view_category", {
      category,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addCategoryPage = (req, res) => {
  return res.render("category/add_category");
};

const addCategory = async (req, res) => {
  try {
    console.log(req.body);
    const { categoryName } = req.body;
    await catModel.create({
      category: categoryName,
    });
    req.flash("success", "Category has been successflly added!");

    return res.redirect("/category/add");
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteCategory = async (req, res) => {
  try {
    // console.log(req.query);
    const id = req.query.id;
    await catModel.findByIdAndDelete(id);

    req.flash("success", "Category Successfully delete");

    return res.redirect("/category");
  } catch (error) {
    console.log(error);
    return false;
  }
};

const editCategory = (req, res) => {
  try {
    // let category = await CategoryModel.find({});
    return res.render("category/edit_category");
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = {
  addCategory,
  addCategoryPage,
  catergoryPage,
  deleteCategory,
  editCategory,
};
