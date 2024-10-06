const category = require("../model/catModel");
const cateModel = require("../model/catModel");
const subCatModel = require("../model/subCatModel");

const subCatPage = async (req, res) => {
  const subCategory = await subCatModel.find({}).populate("categoryId");
  // console.log(subCategory);

  return res.render("Subcategory/view_subCat", {
    subcat: subCategory,
  });
};

const addSubCatPage = async (req, res) => {
  const category = await cateModel.find({ status: "active" });
  return res.render("subCategory/add_subCat", {
    category: category,
  });
};

const addSubCat = async (req, res) => {
  try {
    const { category, subcategory } = req.body;
    console.log(req.body);

    await subCatModel.create({
      categoryId: category,
      subcategory: subcategory,
    });

    req.flash("success", "subcategory successfully add");

    return res.redirect("/subCategory/add");
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteSubcat = async (req, res) => {
  try {
    const id = req.query.id;
    await subCatModel.findByIdAndDelete(id);
    console.log("subcategory deleted!!");
    return res.redirect("/subCategory");
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = {
  subCatPage,
  addSubCatPage,
  addSubCat,
  deleteSubcat,
};
