import 'bootstrap/dist/css/bootstrap.min.css'

import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/cart'
import Cart from './screens/Cart'
import Checkout from './screens/Checkout'

import Home from './screens/Home'
import Layout from './screens/Layout'

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </CartProvider>
    </div>
  )
}

export default App
