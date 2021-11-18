const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')

const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

connectDB()

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))
