const mongoose = require("mongoose")

const stockSchema = new mongoose.Schema({
    currentStock: {type: String, required: true},
    neededStock: {type: String, required: true},
},
{timestamps: true})

const Stock = new mongoose.model("Stock", stockSchema)

module.exports = Stock