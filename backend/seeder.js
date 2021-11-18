const dotenv = require('dotenv')
const products = require('./data/products.js')
const orders = require('./data/orders.js')
const Product = require('./models/Product.js')
const Order = require('./models/Order')
const connectDB = require('./config/db.js')

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Product.deleteMany()
    await Order.deleteMany()
    console.log('cleared Database ✅')

    await Product.insertMany(products)
    await Order.insertMany(orders)
    console.log('created Rows ✅')

    process.exit()
  } catch (error) {
    console.error(`oh no -> ${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany()
    await Order.deleteMany()
    console.log('cleared Database 🧨✅')
    process.exit()
  } catch (error) {
    console.error(`oh no -> ${error}`)
    process.exit(1)
  }
}

process.argv[2] === '-d' ? destroyData() : importData()
