require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const { startStockUpdater } = require("./services/stockUpdater");
const { isLoggedIn } = require("./Middleware/AuthMiddleware");

// Routes
const authRoutes = require("./Routes/AuthRoutes");
const userRoutes = require("./Routes/UsersRoutes");
const stocksRoutes = require("./Routes/StocksRoutes");
const holdingsRoutes = require("./Routes/HoldingsRoutes");
const positionsRoutes = require("./Routes/PositionsRoutes");
const watchlistRoutes = require("./Routes/WatchlistRoutes");
const ordersRoutes = require("./Routes/OrdersRoutes");
const portfolioRoutes = require("./Routes/PortfolioRoutes");
const tradeRoutes = require("./Routes/Trade");
const walletRoutes = require("./Routes/walletRoutes");

const app = express();
const port = process.env.PORT || 8080;
app.set("trust proxy", 1);

/* ----------------------------- CORS ----------------------------- */
const allowed = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, cb) {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    cb(new Error("❌ Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

/* --------------------------- Middleware --------------------------- */
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

/* --------------------------- MongoDB --------------------------- */
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

/* -------------------------- Health check -------------------------- */
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "backend", timestamp: Date.now() });
});

/* ----------------------------- Routes ----------------------------- */
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


app.get("/", (req, res) => {
  if (req.headers.accept && req.headers.accept.includes("text/html")) {
    res.sendFile(path.join(__dirname, "views", "home.html"));
  } else {
    res.json({ ok: true, service: "InvestraX API", docs: "/api" });
  }
});

/* --------------------- Catch-all for 404 --------------------- */
app.all("*", (req, res) => {
  if (req.headers.accept && req.headers.accept.includes("text/html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else {
    res.status(404).json({ error: "Not Found", route: req.originalUrl });
  }
});

/* --------------------------- Start --------------------------- */
app.listen(port, () => {
  console.log(`🚀 Server listening on :${port}`);
  startStockUpdater();
});
