const express = require("express")
const router = express.Router()
const transactionControllers = require("../controllers/transactionController")

router.route("/add-transaction").post(transactionControllers.addTransactions)
router.route("/all-transaction").get(transactionControllers.allTransactions)
router.route("/all-transaction/:id").delete(transactionControllers.deleteTransactions)

module.exports = router