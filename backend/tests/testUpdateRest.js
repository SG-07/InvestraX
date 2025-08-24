require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const updateRest = require("../services/stockUpdater/updateRest");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected for testUpdateRest");

    await updateRest();

    console.log("🎯 Done testUpdateRest");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.disconnect();
  }
})();
