require("dotenv").config({ path: "./config/.env" });
console.log("MONGODB_URL from env:", process.env.MONGO_URL);

const mongoose = require("mongoose");
const initData = require("./companies");
const Stocks = require("../models/stocksmodel");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    console.log(
      "Connected to MongoDB and using database:",
      mongoose.connection.name
    )
  )
  .catch((err) => console.error("MongoDB connection error:", err));

//disconneting from db
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  } catch (err) {
    console.error("Error closing MongoDB connection:", err);
    process.exit(1);
  }
});

const initDB = async () => {
  mongoose.connection.once("open", async () => {
    console.log("Connected to MongoDB, now adding stocks...");
    await Stocks.deleteMany({});
    await Stocks.insertMany(initData);
    console.log("data was initialized");
    console.log("Stocks added successfully.");
  });
};

initDB();
