require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const { updateBatch } = require("../services/stockupdater/batch");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to DB");

    await updateBatch(["TCS.NS", "INFY.NS", "RELIANCE.NS"]);

    console.log("🎉 Batch update test finished");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();
