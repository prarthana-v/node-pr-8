const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pdvaghani:pdvaghani@cluster0.quhpv.mongodb.net/admin-panel"
    );
    console.log("MongoDB connected..");
  } catch (err) {
    console.error(err.message);
    return false;
  }
};

module.exports = connectDB;
