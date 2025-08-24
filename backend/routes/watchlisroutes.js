const router = require("express").Router();
const { userVerification } = require("../middleware/authmiddleware");
const ctrl = require("../controllers/watchlistcontroller");

router.get("/", userVerification, ctrl.list);
router.post("/", userVerification, ctrl.add);
router.delete("/:symbol", userVerification, ctrl.remove);

module.exports = router;
