const router = require("express").Router();
const { userVerification } = require("../Middleware/AuthMiddleware");
const ctrl = require("../Controllers/PortfolioController");

router.get("/summary", userVerification, ctrl.summary);

module.exports = router;