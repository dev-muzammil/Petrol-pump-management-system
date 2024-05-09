const mongoose = require("mongoose");

const URI =
  "mongodb+srv://muzammil:muzii786@cluster0.xzp5ifn.mongodb.net/PETROL_PUMP?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection successful to database");
  } catch (error) {
    console.log("Connection failed to database", error);
  }
};

module.exports = connectDb;
