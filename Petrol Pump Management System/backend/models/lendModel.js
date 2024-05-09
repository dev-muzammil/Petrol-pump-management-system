const mongoose = require("mongoose")

const lendSchema = new mongoose.Schema({
    lendedProduct: {type: String, required: true},
    lendedQuantity: {type: String, required: true},
    lendedAmount: {type: String, required: true},
    lendedFrom: {type: String, required: true},
},
{timestamps: true})

const Lend = new mongoose.model("Lend", lendSchema)

module.exports = Lend