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
const authRoutes = require("./Routes/AuthRoute");

const app = express();
const port = process.env.PORT || 8080;

/* ----------------------------- MIDDLEWARE ----------------------------- */
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* ---------------------------- DATABASE SETUP ---------------------------- */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`))
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
app.use("/auth", authRoutes); // JWT login/signup/verify routes

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

/* --------------------------- START SERVER --------------------------- */
app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port}`);
});
