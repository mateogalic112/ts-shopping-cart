const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (_, res) => {
  const products = await Product.find({});
  res.json(products);
});

module.exports = {
  getProducts,
};
