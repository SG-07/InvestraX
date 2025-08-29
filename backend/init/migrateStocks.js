const mongoose = require("mongoose");
const stockModel = require("../models/stocksmodel"); 
require("dotenv").config({ path: "./config/.env" });


async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Add missing fields with defaults to all docs
    const result = await stockModel.updateMany(
      {}, // all docs
      {
        $set: {
          change: 0,
          changepct: 0,
          low52: 0,
          high52: 0,
          eps: 0,
          pe: 0,
          marketcap: 0,
        },
      }
    );

    console.log(`✅ Updated ${result.modifiedCount} stocks`);

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Migration failed:", err);
    mongoose.disconnect();
  }
}

migrate();
