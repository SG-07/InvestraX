const router = require("express").Router();
const { userVerification } = require("../Middleware/AuthMiddleware");
const ctrl = require("../controllers/PortfolioController");

router.get("/summary", userVerification, ctrl.summary);

module.exports = router;