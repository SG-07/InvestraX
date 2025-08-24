const router = require("express").Router();
const { userVerification } = require("../middleware/authmiddleware");
const ctrl = require("../controllers/portfoliocontroller");

router.get("/summary", userVerification, ctrl.summary);

module.exports = router;
