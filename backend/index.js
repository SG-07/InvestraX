require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const { startStockUpdater } = require("./services/stockupdater");
const { isLoggedIn } = require("./middleware/authmiddleware");
const wakeDashboard = require("./services/wakeDashboard");
const { startSheetUpdater } = require("./services/updater"); // ✅ Sheet updater

// Routes
const authRoutes = require("./routes/authroutes");
const userRoutes = require("./routes/usersroutes");
const stocksRoutes = require("./routes/stocksroutes");
const holdingsRoutes = require("./routes/holdingsroutes");
const positionsRoutes = require("./routes/positionsroutes");
const watchlistRoutes = require("./routes/watchlistroutes");
const ordersRoutes = require("./routes/ordersroutes");
const portfolioRoutes = require("./routes/portfolioroutes");
const tradeRoutes = require("./routes/traderoutes");
const walletRoutes = require("./routes/walletroutes");

const app = express();
const port = process.env.PORT || 8080;
app.set("trust proxy", 1);

// --------------- EJS Setup ---------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ------------ Security & Logging --------------
app.use(helmet());
app.use(morgan("dev"));

// -------------------- CORS --------------------
const allowed = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

console.log("✅ Allowed origins:", allowed);

const corsOptions = {
  origin: function (origin, cb) {
    console.log("🌍 CORS check for origin:", origin);
    if (!origin || allowed.includes(origin)) {
      console.log("✅ Origin allowed:", origin);
      return cb(null, true);
    }
    console.log("❌ Origin blocked:", origin);
    cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// -------------------- Middleware --------------------
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// -------------------- MongoDB --------------------
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
    console.error("Close error:", err);
    process.exit(1);
  }
});

// -------------------- Health check --------------------
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "backend", timestamp: Date.now() });
});

// -------------------- Routes --------------------
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stocks", stocksRoutes);
app.use("/api/holdings", holdingsRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api", isLoggedIn, tradeRoutes);
app.use("/api/wallet", walletRoutes);

// -------------------- Root route --------------------
app.get("/", (req, res) => {
  res.render("index", { frontendUrl: process.env.FRONTEND_URL });
});

// -------------------- Catch-all for 404 --------------------
app.use((req, res) => {
  console.log("⚠️ 404 Not Found:", req.originalUrl);
  if (req.headers.accept && req.headers.accept.includes("text/html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else {
    res.status(404).json({ error: "Not Found", route: req.originalUrl });
  }
});

// -------------------- Start Server --------------------
app.listen(port, () => {
  console.log(`🚀 Server listening on :${port}`);
  console.log("🔑 Dashboard URL (from env):", process.env.DASHBOARD_URL);

  // ✅ Stock updater
  startStockUpdater();

  // ✅ Sheet updater (runs only if SHEET_URL is set in env)
  if (process.env.SHEET_URL) {
    try {
      startSheetUpdater();
      console.log("📊 Google Sheet updater started...");
    } catch (e) {
      console.error("❌ sheetUpdater: failed to start:", e.message || e.toString());
    }
  } else {
    console.log("⚠️ No SHEET_URL provided, skipping sheet updater.");
  }

  // ✅ Wake up dashboard
  setTimeout(() => wakeDashboard(), 1000);
});
