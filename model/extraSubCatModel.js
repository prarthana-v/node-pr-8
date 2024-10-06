const mongoose = require("mongoose");
const extrasubcatSchema = mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory",
  },
  extrasubcategory: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
});
const extrasubcat = mongoose.model("extraSubCategory", extrasubcatSchema);
module.exports = extrasubcat;
