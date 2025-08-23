const router = require("express").Router();
const { userVerification } = require("../Middleware/AuthMiddleware");
const ctrl = require("../Controllers/WatchlistController");

router.get("/", userVerification, ctrl.list);
router.post("/", userVerification, ctrl.add);
router.delete("/:symbol", userVerification, ctrl.remove);

module.exports = router;