const express = require("express")
const router = express.Router()
const tankControllers = require("../controllers/tankController")

router.route("/add-tank").post(tankControllers.addTank)
router.route("/all-tank").get(tankControllers.allTanks)
router.route("/all-tank/:id").delete(tankControllers.deleteTank)

module.exports = router