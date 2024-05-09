const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    stock: {type: String, required: true},
},
{timestamps: true})

const Product = new mongoose.model("Product", productSchema)

module.exports = Product