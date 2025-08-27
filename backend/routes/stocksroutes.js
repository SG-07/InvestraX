const router = require("express").Router();
const ctrl = require("../controllers/stockscontroller");

router.get("/", ctrl.list);
router.get("/categories", ctrl.categories);
router.get("/:symbol", ctrl.getOne);

module.exports = router;
