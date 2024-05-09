const Transactions = require("../models/transactionModel");

const allTransactions = async (req, res) => {
  try {
    const transactions = await Transactions.find({});
    return res.status(200).json({
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const addTransactions = async (req, res) => {
  try {
    const { purchase, sale, expense, profit, cash_payments, cash_recieve } =
      req.body;
    if (
      !purchase ||
      !sale ||
      !expense ||
      !profit ||
      !cash_payments ||
      !cash_recieve
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const createTransaction = await Transactions.create({
      purchase,
      sale,
      expense,
      profit,
      cash_payments,
      cash_recieve,
    });
    return res
      .status(200)
      .json({ message: "Transaction Added", createTransaction });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

const deleteTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Transactions.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).json({ message: "Transaction not found" });
    }
    return res
      .status(200)
      .json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = { addTransactions, allTransactions, deleteTransactions };
