require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const updateAllStocks = require("../services/stocks/updateAll");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected for testUpdateAll");

    await updateAllStocks();

    console.log("🎯 Done testUpdateAll");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.disconnect();
  }
})();