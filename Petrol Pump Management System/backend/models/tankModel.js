const mongoose = require("mongoose")

const tankSchema = new mongoose.Schema({
    tankName: {type: String, required: true},
    tankQuantity: {type: String, required: true},
    tankDescription: {type: String, required: true},
    productName: {type: String, required: true},
},
{timestamps: true})

const Tank = new mongoose.model("Tank", tankSchema)

module.exports = Tank