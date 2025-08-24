const router = require("express").Router();
const { isLoggedIn } = require("../middleware/authmiddleware");
const ctrl = require("../controllers/portfoliocontroller");

router.get("/summary", isLoggedIn, ctrl.summary);

module.exports = router;
