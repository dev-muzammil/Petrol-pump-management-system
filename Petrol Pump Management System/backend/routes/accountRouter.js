const express = require("express")
const router = express.Router()
const accountControllers = require("../controllers/accountController")

router.route("/add-account").post(accountControllers.addAccount)
router.route("/all-account").get(accountControllers.allAccounts)
router.route("/all-account/:id").delete(accountControllers.deleteAccount)

module.exports = router