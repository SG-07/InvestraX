const router = require("express").Router();
const { userVerification } = require("../Middleware/AuthMiddleware");
const ctrl = require("../controllers/HoldingController");

router.get("/", userVerification, ctrl.list);
router.post("/", userVerification, ctrl.create);

module.exports = router;