const Tank = require("../models/tankModel");

const allTanks = async (req, res) => {
  try {
    const tanks = await Tank.find({});
    return res.status(200).json({
      count: tanks.length,
      data: tanks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const addTank = async (req, res) => {
  try {
    const { tankName, tankQuantity, tankDescription, productName } = req.body;
    if (!tankName || !tankQuantity || !tankDescription || !productName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const createTank = await Tank.create({
      tankName,
      tankQuantity,
      tankDescription,
      productName,
    });
    return res.status(200).json({ message: "Tank Added", createTank });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

const deleteTank = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Tank.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).json({ message: "Tank not found" });
    }
    return res.status(200).json({ message: "Tank deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = { addTank, allTanks, deleteTank };
