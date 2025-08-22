require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Models
const HoldingsModel = require("./Models/HoldingsModel");
const PositionsModel = require("./Models/PositionsModel");
const OrdersModel = require("./Models/OrdersModel");

// Routes
const authRoutes = require("./Routes/AuthRoutes");
const stockRoutes = require("./Routes/StocksRoute");

// Services
const { startStockUpdater } = require("./services/stockUpdater");

const app = express();
const port = process.env.PORT || 8080;

console.log("✅ Backend starting...");

/* ----------------------------- CORS SETUP ----------------------------- */
const corsOptions = {
  origin: [
    "http://localhost:3000", // local dev
    "https://investrax-frontend.onrender.com",
    "https://investrax-dashboard.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

/* ----------------------------- MIDDLEWARE ----------------------------- */
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

/* ---------------------------- DATABASE SETUP ---------------------------- */
mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
  .then(() =>
    console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`)
  )
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("🛑 MongoDB connection closed.");
    process.exit(0);
  } catch (err) {
    console.error("Error closing MongoDB connection:", err);
    process.exit(1);
  }
});

/* ------------------------------- ROUTES ------------------------------- */
console.log("✅ Registering /auth routes...");
app.use("/auth", authRoutes);
// Register routes
app.use("/stocks", stockRoutes);

app.get("/allHoldings", async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode } = req.body;
  const newOrder = new OrdersModel({ name, qty, price, mode });
  await newOrder.save();
  res.send("✅ Order saved!");
});

// ✅ API route for frontend to get all stocks from DB
const StocksModel = require("./Models/StocksModel");
app.get("/stocks", async (req, res) => {
  const stocks = await StocksModel.find({});
  res.json(stocks);
});

/* --------------------------- START SERVER --------------------------- */
app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port}`);
  startStockUpdater(); // Start Yahoo Finance price updater
});
