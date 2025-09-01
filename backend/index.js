require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");

const { isLoggedIn } = require("./middleware/authmiddleware");
const { updateStocksFromSheet, startSheetUpdater } = require("./services/updater");

// ------------ Import Routes ------------
const authRoutes = require("./routes/authroutes");
const userRoutes = require("./routes/usersroutes");
const stocksRoutes = require("./routes/stocksroutes");
const portfolioRoutes = require("./routes/portfolioroutes");
const tradeRoutes = require("./routes/traderoutes");

const app = express();
const port = process.env.PORT || 8080;
app.set("trust proxy", 1);

// ------------ EJS Setup ------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ------------ Security & Logging ------------
app.use(helmet());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// ------------ CORS Setup ------------
const allowed = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

console.log("✅ Allowed origins:", allowed);

const corsOptions = {
  origin: function (origin, cb) {
    console.log("🌍 CORS check for:", origin);
    if (!origin || allowed.includes(origin)) {
      console.log("✅ Allowed:", origin);
      return cb(null, true);
    }
    console.log("❌ Blocked:", origin);
    cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// ------------ Middleware ------------
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// ------------ MongoDB Connection ------------
mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log(`✅ Mongo connected: ${mongoose.connection.name}`))
  .catch((err) => {
    console.error("❌ Mongo error:", err);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("🛑 Mongo connection closed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Close error:", err);
    process.exit(1);
  }
});

// ------------ Health Check ------------
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "backend", timestamp: Date.now() });
});

// ------------ Routes ------------
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stocks", stocksRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/trade", isLoggedIn, tradeRoutes); // trade APIs protected

// ------------ Root Route ------------
app.get("/", (req, res) => {
  res.render("index", { frontendUrl: process.env.FRONTEND_URL });
});

// ------------ 404 Handler ------------
app.use((req, res) => {
  console.log("⚠️ 404 Not Found:", req.originalUrl);
  if (req.headers.accept && req.headers.accept.includes("text/html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else {
    res.status(404).json({ error: "Not Found", route: req.originalUrl });
  }
});

// ------------ Start Server ------------
app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port}`);
  console.log("🔑 Dashboard URL:", process.env.DASHBOARD_URL);

  // ✅ Initial load of stock prices into DB
  updateStocksFromSheet();

  // ✅ Start periodic updater
  if (process.env.SHEET_CSV_URL) {
    try {
      startSheetUpdater();
      console.log("📊 Google Sheet updater started...");
    } catch (e) {
      console.error("❌ Failed to start sheet updater:", e.message || e.toString());
    }
  } else {
    console.log("⚠️ No SHEET_CSV_URL provided, skipping updater.");
  }
});
