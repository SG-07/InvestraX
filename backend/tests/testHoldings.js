require("dotenv").config({ path: "./config/.env" });
const { updateHoldingsSymbols } = require("../services/stockUpdater/holdings");
const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to DB");

    await updateHoldingsSymbols();

    console.log("🎉 Holdings update test finished");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();