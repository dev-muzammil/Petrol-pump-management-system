const express = require("express")
const router = express.Router()
const lendControllers = require("../controllers/lendedController")

router.route("/add-lend").post(lendControllers.addLend)
router.route("/all-lend").get(lendControllers.allLend)
router.route("/all-lend/:id").delete(lendControllers.deleteLend)

module.exports = router