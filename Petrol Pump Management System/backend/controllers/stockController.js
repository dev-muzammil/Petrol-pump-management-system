const Stock = require("../models/stockModel");

const allStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({});
    return res.status(200).json({
      count: stocks.length,
      data: stocks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const addStock = async (req, res) => {
  try {
    const { currentStock, neededStock } = req.body;
    if (!currentStock || !neededStock) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const createStock = await Stock.create({
      currentStock,
      neededStock,
    });
    return res.status(200).json({ message: "Stock Added", createStock });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Stock.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).json({ message: "Stock not found" });
    }
    return res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = { addStock, allStocks, deleteStock };
