const router = require("express").Router();
const { Signup, Login, Logout, Verify } = require("../Controllers/AuthController");
const { userVerification } = require("../Middleware/AuthMiddleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/verify", userVerification, Verify);

module.exports = router;