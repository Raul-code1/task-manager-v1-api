const mongoose = require("mongoose");

const connectDb = (url) => {
  mongoose.set("strictQuery", false);
  mongoose.connect(url);
};

module.exports = connectDb;

