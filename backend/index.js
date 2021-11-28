const path = require('path')
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(path.resolve(), '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(path.resolve(), 'frontend', 'build', 'index.html'),
    ),
  )
}

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))
