const express = require("express")
const router = express.Router()
const stockControllers = require("../controllers/stockController")

router.route("/add-stock").post(stockControllers.addStock)
router.route("/all-stock").get(stockControllers.allStocks)
router.route("/all-stock/:id").delete(stockControllers.deleteStock)

module.exports = router