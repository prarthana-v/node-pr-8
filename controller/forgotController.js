const userModel = require("../model/userModel");
const nodemailer = require("nodemailer");
// const crypto = require("crypto");

const postEmail = async (req, res) => {
  const forgotemail = req.body.forgotemail;
  try {
    const user = await userModel.find({ email: forgotemail });
    console.log(user);

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/"); // Redirect if user is not found
    }

    // Generate a random six-digit OTP
    const otp = Math.floor(Math.random() * 1000000); // Generate OTP

    // Setup Nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "p.d.vaghani1729@gmail.com",
        pass: "cssd uukf imbe xmlc",
      },
    });

    // Mail options
    const mailOptions = {
      from: "p.d.vaghani1729@gmail.com",
      to: user[0].email,
      subject: "Your OTP Code",
      html: `<h1>Your OTP Code is: ${otp}</h1>`,
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        let obj = {
          email: user[0].email, // Store the correct email
          otp: otp,
        };
        console.log(obj);
        res.cookie("otp", obj); // Set cookie

        return res.redirect("/forgot/verifyotp"); // Redirect to OTP verification page
      }
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const verifyotpPage = (req, res) => {
  return res.render("pages/verifyOtp");
};

const verifyOtp = async (req, res) => {
  try {
    const otp = req.body.otp; // Get OTP entered by user
    const storedOtp = req.cookies.otp.otp; // Get OTP from cookie

    // Check if the cookie exists and has the otp field
    if (!storedOtp) {
      req.flash("error", "No OTP found in cookies.");
      return res.redirect("/forgot/verifyotp");
    }

    // Check if the OTP entered by the user matches the OTP in the cookie
    if (otp == storedOtp) {
      console.log("OTP verified successfully!");

      // Redirect to reset password or success page
      return res.redirect("/forgot/resetpassword");
    } else {
      req.flash("error", "Invalid OTP"); // Flash an error if OTP doesn't match
      return res.redirect("/forgot/verifyotp"); // Redirect to OTP verification page
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const resetpasswordPage = (req, res) => {
  return res.render("pages/resetPassword");
};

const resetpassword = async (req, res) => {
  try {
    console.log(req.body, "rp");
    const { newpass, cpass } = req.body;

    // check if new password and confirm password match
    if (newpass != cpass) {
      req.flash("error", "Passwords do not match!");
      return res.redirect("/forgot/resetpassword"); // Redirect back to reset password page
    }

    // Assuming email or user identification is stored in the cookie
    const userEmail = req.cookies.otp?.email;

    if (!userEmail) {
      console.log("error", "Session expired or invalid request.");
      return res.redirect("/"); // Redirect to forgot password if no email is found
    }

    // Update the password in the database
    await userModel.findOneAndUpdate(
      { email: userEmail },
      { password: newpass }
    );
    console.log("password updated successfully");

    // Clear the OTP cookie after successful password reset
    res.clearCookie("otp");

    // Redirect to login page or success page
    req.flash(
      "success",
      "Password reset successful! Please login with your new password."
    );
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = {
  postEmail,
  verifyotpPage,
  verifyOtp,
  resetpasswordPage,
  resetpassword,
};
