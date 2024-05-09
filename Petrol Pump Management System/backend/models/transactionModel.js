const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    purchase: {type: String, required: true},
    sale: {type: String, required: true},
    expense: {type: String, required: true},
    profit: {type: String, required: true},
    cash_payments: {type: String, required: true},
    cash_recieve: {type: String, required: true},
},
{timestamps: true})

const Transaction = new mongoose.model("Transaction", transactionSchema)

module.exports = Transaction