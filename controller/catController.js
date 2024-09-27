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

const editCategory = async (req, res) => {
  try {
    const id = req.query.id;
    let single = await catModel.findById(id);
    console.log(single);

    return res.render("category/edit_category", {
      single,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateCategory = async (req, res) => {
  try {
    console.log(req.body);
    const { id, categoryName, status } = req.body;
    await catModel.findByIdAndUpdate(id, {
      category: categoryName,
    });
    req.flash("success", "Category Successfully update");
    return res.redirect("/category");
  } catch (error) {
    console.log(error);
    return false;
  }
};

const changeStatus = async (req, res) => {
  try {
    const status = req.query.status;
    const id = req.query.id;
    if (status == "active") {
      await catModel.findByIdAndUpdate(id, { status: "deactive" });
      req.flash("success", "Status Successfully changed");
      return res.redirect("/category");
    } else {
      await catModel.findByIdAndUpdate(id, { status: "active" });
      req.flash("success", "Status Successfully changed");
      return res.redirect("/category");
    }
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
  updateCategory,
  changeStatus,
};
