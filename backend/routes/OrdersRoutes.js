const router = require("express").Router();
const { userVerification } = require("../middleware/authmiddleware");
const ctrl = require("../controllers/orderscontroller");

router.get("/", userVerification, ctrl.list);
router.post("/", userVerification, ctrl.create);

module.exports = router;
