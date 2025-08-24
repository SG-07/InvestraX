const router = require("express").Router();
const { userVerification } = require("../middleware/authmiddleware");
const ctrl = require("../controllers/positioncontroller");

router.get("/", userVerification, ctrl.list);

module.exports = router;
