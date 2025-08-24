const router = require("express").Router();
const {
  Signup,
  Login,
  Logout,
  Verify,
} = require("../controllers/authcontroller");
const { isLoggedIn } = require("../middleware/authmiddleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/verify", isLoggedIn, Verify);

module.exports = router;
