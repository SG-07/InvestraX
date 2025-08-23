const router = require("express").Router();
const ctrl = require("../Controllers/StocksController");

router.get("/", ctrl.list);
router.get("/categories", ctrl.categories);
router.get("/:symbol", ctrl.getOne);

module.exports = router;