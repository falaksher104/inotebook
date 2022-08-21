const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
 const connectDB = mongoose.connect(
 MONGO_URI,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);
module.exports = connectDB;