const router = require("express").Router();
const { userVerification } = require("../middleware/authmiddleware");
const ctrl = require("../controllers/userscontroller");

router.get("/me", userVerification, ctrl.me);

module.exports = router;
