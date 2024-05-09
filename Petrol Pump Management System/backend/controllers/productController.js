const Product = require("../models/productModel");

const allProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, category, stock } = req.body;
    if (!name || !category || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const createProduct = await Product.create({
      name,
      category,
      stock,
    });
    return res.status(200).json({ message: "Product Added", createProduct });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports = { addProduct, allProducts, deleteProduct };
