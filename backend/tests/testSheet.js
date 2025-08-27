require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const { updateStocksFromSheet } = require("../services/updater");

// Connect DB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB Connection failed:", err);
    process.exit(1);
  }
}

async function runTest() {
  await connectDB();
  console.log("⚡ Running one-time Google Sheets sync...");

  try {
    await updateStocksFromSheet();
    console.log("✅ Sync successful");
  } catch (err) {
    console.error("❌ Sync failed:", err);
  } finally {
    mongoose.connection.close();
  }
}

runTest();