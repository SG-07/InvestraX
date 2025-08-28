const router = require("express").Router();
const { isLoggedIn } = require("../middleware/authmiddleware");
const ctrl = require("../controllers/watchlistcontroller");

router.get("/", isLoggedIn, ctrl.list);
router.get("/search", isLoggedIn, ctrl.search);
router.post("/", isLoggedIn, ctrl.add);
router.delete("/:symbol", isLoggedIn, ctrl.remove);

module.exports = router;
