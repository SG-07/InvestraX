const router = require("express").Router();
const { Signup, Login, Logout } = require("../Controllers/AuthController");
const { userVerification } = require("../Middleware/AuthMiddleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/verify", (req, res, next) => {
  console.log("📡 Received /auth/verify request");
  console.log("Cookies:", req.cookies);
  next();
}, userVerification);

module.exports = router;