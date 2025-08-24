require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const PositionsModel = require("../models/positionsmodel");

async function seedHoldings() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("✅ Connected to MongoDB");

    const sampleHoldings = [
      {
        product: "CNC",
        name: "Reliance Industries",
        symbol: "RELIANCE.NS",
        qty: 5,
        price: 1425,
        avg: 1400,
        net: "+1.8%",
        day: "-0.4%",
        isLoss: false,
      },
      {
        product: "CNC",
        name: "HDFC Bank",
        symbol: "HDFCBANK.NS",
        qty: 10,
        price: 1980,
        avg: 1950,
        net: "+1.5%",
        day: "+0.6%",
        isLoss: false,
      },
      {
        product: "CNC",
        name: "Infosys",
        symbol: "INFY.NS",
        qty: 3,
        price: 1500,
        avg: 1550,
        net: "-3.2%",
        day: "-0.9%",
        isLoss: true,
      },
    ];

    await PositionsModel.deleteMany({});
    await PositionsModel.insertMany(sampleHoldings);

    console.log("🌱 Holdings seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding holdings:", err);
    process.exit(1);
  }
}

seedHoldings();