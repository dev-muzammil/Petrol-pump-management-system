const Lend = require("../models/lendModel");

const allLend = async (req, res) => {
  try {
    const lends = await Lend.find({});
    return res.status(200).json({
      count: lends.length,
      data: lends,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const addLend = async (req, res) => {
  try {
    const { lendedProduct, lendedQuantity, lendedAmount, lendedFrom } =
      req.body;
    if (!lendedProduct || !lendedQuantity || !lendedAmount || !lendedFrom) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const createLend = await Lend.create({
      lendedProduct,
      lendedQuantity,
      lendedAmount,
      lendedFrom,
    });
    return res.status(200).json({ message: "Lend Added", createLend });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

const deleteLend = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Lend.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).json({ message: "Lend not found" });
    }
    return res.status(200).json({ message: "Lend deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = { addLend, allLend, deleteLend };
