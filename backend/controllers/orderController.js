const asyncHandler = require('express-async-handler')
const Order = require('../models/Order')

// @desc    Create order
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
  const { customer, cartItems, totalPrice } = req.body

  const order = await Order.create({
    customer,
    cartItems,
    totalPrice,
  })

  res.status(201).json(order)
})

module.exports = {
  createOrder,
}
