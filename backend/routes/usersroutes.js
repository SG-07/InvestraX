const router = require("express").Router();
const { isLoggedIn } = require("../middleware/authmiddleware");
const ctrl = require("../controllers/userscontroller");

router.get("/me", isLoggedIn, ctrl.me);

module.exports = router;
