const express = require("express");
const {
  postEmail,
  verifyotpPage,
  verifyOtp,
  resetpasswordPage,
  resetpassword,
} = require("../controller/forgotController");
const routes = express.Router();

routes.post("/postEmail", postEmail);
routes.get("/verifyotp", verifyotpPage);
routes.post("/verifyOtp", verifyOtp);
routes.get("/resetpassword", resetpasswordPage);
routes.post("/resetpassword", resetpassword);

module.exports = routes;
