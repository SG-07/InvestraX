const router = require("express").Router();
const ctrl = require("../controllers/stockscontroller");
const { isLoggedIn } = require("../middleware/authmiddleware");

// 📌 General stock APIs
router.get("/", isLoggedIn, ctrl.list);
router.get("/categories", isLoggedIn, ctrl.categories);

// 📌 Market indices (must come BEFORE :symbol)
router.get("/market/sensex", isLoggedIn, ctrl.getSensex);
router.get("/market/nifty", isLoggedIn, ctrl.getNifty);

// 📌 Single stock (catch-all at the bottom)
router.get("/:symbol", isLoggedIn, ctrl.getOne);

module.exports = router;