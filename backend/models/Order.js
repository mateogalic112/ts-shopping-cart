const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  customer: {
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    card: {
      type: Number,
      required: true,
    },
  },
  cartItems: [
    {
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Order', orderSchema)
