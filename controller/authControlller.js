const userModel = require("../model/userModel");

const login = (req, res) => {
  if (res.locals.users) {
    return res.redirect("pages/dashboard");
  }
  return res.render("pages/login");
};

const register = (req, res) => {
  return res.render("pages/register");
};

const registerUser = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, cpass } = req.body;

    if (password !== cpass) {
      req.flash("error", "Passwords do not match!");
      return res.redirect("/register");
    }

    await userModel.create({
      name: name,
      email: email,
      password: password,
    });
    console.log("User Register");

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return false;
  }
};

const loginUser = (req, res) => {
  return res.redirect("/dashboard");
};

const dashboard = (req, res) => {
  return res.render("pages/dashboard");
};

module.exports = {
  login,
  register,
  registerUser,
  loginUser,
  dashboard,
};
