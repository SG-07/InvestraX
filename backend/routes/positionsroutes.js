const router = require("express").Router();
const { isLoggedIn } = require("../middleware/authmiddleware");
const ctrl = require("../controllers/positioncontroller");

router.get("/", isLoggedIn, ctrl.list);

module.exports = router;
