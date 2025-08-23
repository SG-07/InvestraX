const router = require("express").Router();
const { userVerification } = require("../Middleware/AuthMiddleware");
const ctrl = require("../Controllers/PositionsController");

router.get("/", userVerification, ctrl.list);

module.exports = router;