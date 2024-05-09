const express = require("express")
const router = express.Router()
const productControllers = require("../controllers/productController")

router.route("/add-product").post(productControllers.addProduct)
router.route("/all-product").get(productControllers.allProducts)
router.route("/all-product/:id").delete(productControllers.deleteProduct)

module.exports = router