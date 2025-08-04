const router = require("express").Router();

console.log("✅ Auth routes file loaded");

// Temporary test route (bypass JWT for now)
router.get("/verify", (req, res) => {
  console.log("📡 Received GET /auth/verify");
  console.log("Cookies received:", req.cookies);
  res.json({ message: "Verify route works", cookies: req.cookies });
});

module.exports = router;
