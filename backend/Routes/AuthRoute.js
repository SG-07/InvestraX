const router = require("express").Router();
const { Signup, Login, Logout } = require("../Controllers/AuthController");
const { userVerification } = require("../Middleware/AuthMiddleware");

// Signup
router.post("/signup", Signup);

// Login
router.post("/login", Login);

// Logout
router.get("/logout", Logout);

// Verify - Added logging
router.get("/verify", (req, res, next) => {
  console.log("📡 [VERIFY] Incoming request to /auth/verify");
  console.log("📦 Request Headers:", req.headers);
  console.log("🍪 Cookies received:", req.cookies);
  next();
}, userVerification);

module.exports = router;
