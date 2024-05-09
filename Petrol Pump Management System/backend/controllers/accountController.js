const Account = require("../models/accountModel");

const allAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({});
    return res.status(200).json({
      count: accounts.length,
      data: accounts,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const addAccount = async (req, res) => {
  try {
    const { totalAmount, amountToPay, amountToRecieve } = req.body;
    if (!totalAmount || !amountToPay || !amountToRecieve) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const createAccount = await Account.create({
      totalAmount,
      amountToPay,
      amountToRecieve,
    });
    return res.status(200).json({ message: "Account Added", createAccount });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Account.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).json({ message: "Account not found" });
    }
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = { addAccount, allAccounts, deleteAccount };
