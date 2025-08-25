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

// -------------------- Security & Logging --------------------
app.use(helmet());
app.use(morgan("dev"));

// -------------------- CORS --------------------
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

// -------------------- Serve frontend for production (optional) --------------------
app.get("/", (req, res) => {
  if (req.headers.accept && req.headers.accept.includes("text/html")) {
    res.sendFile(path.join(__dirname, "views", "home.html"));
  } else {
    res.json({ ok: true, service: "InvestraX API", docs: "/api" });
  }
});

// -------------------- Catch-all for 404 --------------------
app.use((req, res) => {
  if (req.headers.accept && req.headers.accept.includes("text/html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else {
    res.status(404).json({ error: "Not Found", route: req.originalUrl });
  }
});

// -------------------- Start Server --------------------
app.listen(port, () => {
  console.log(`🚀 Server listening on :${port}`);
  startStockUpdater();
});
