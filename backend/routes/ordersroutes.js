const router = require("express").Router();
const { isLoggedIn } = require("../middleware/authmiddleware");
const ctrl = require("../controllers/orderscontroller");

router.get("/", isLoggedIn, ctrl.list);
router.post("/", isLoggedIn, ctrl.create);

module.exports = router;
