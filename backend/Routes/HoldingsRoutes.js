const router = require("express").Router();
const { userVerification } = require("../Middleware/AuthMiddleware");
const ctrl = require("../Controllers/HoldingsController");

router.get("/", userVerification, ctrl.list);
router.post("/", userVerification, ctrl.create);

module.exports = router;