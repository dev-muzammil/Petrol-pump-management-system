const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    totalAmount: {type: String, required: true},
    amountToPay: {type: String, required: true},
    amountToRecieve: {type: String, required: true},
},
{timestamps: true})

const Account = new mongoose.model("Account", accountSchema)

module.exports = Account