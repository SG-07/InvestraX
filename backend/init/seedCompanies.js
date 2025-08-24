require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const StocksModel = require("../models/stocksmodel");
const companies = require("./companies"); 

async function seedCompanies() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    const count = await StocksModel.countDocuments();
    if (count === 0) {
      console.log("🌱 Seeding companies into DB...");
      await StocksModel.insertMany(
        companies.map((c) => ({
          symbol: c.symbol,
          name: c.name,
          category: c.category,
          lastPrice: 0,
          updatedAt: new Date(),
        }))
      );
      console.log("✅ Companies seeded.");
    } else {
      console.log("ℹ️ Companies already exist, skipping seeding.");
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding companies:", err);
    process.exit(1);
  }
}

seedCompanies();