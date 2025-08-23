const router = require("express").Router();
const { userVerification } = require("../Middleware/AuthMiddleware");
const ctrl = require("../Controllers/UsersController");

router.get("/me", userVerification, ctrl.me);

module.exports = router;