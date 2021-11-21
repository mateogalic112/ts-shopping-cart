import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Cart from './Cart'
import Layout from './Layout'
import { CartContext, CartProvider } from '../contexts/cart/index'
import { Product } from '../models/Product'
import userEvent from '@testing-library/user-event'

const products: Product[] = [
  {
    _id: '111',
    title: 'Smart Hub',
    price: 49.99,
  },
  {
    _id: '211',
    title: 'Motion Sensor',
    price: 24.99,
  },
]

test('Test cart pricing functionality', async () => {
  let index = 0
  render(
    <MemoryRouter>
      <CartProvider>
        <CartContext.Consumer>
          {(value) => (
            <Layout>
              <Cart />
              <button
                onClick={() => {
                  value.addItemToCart({ item: products[index], quantity: 1 })
                  index += 1
                }}
              >
                Add to cart
              </button>
            </Layout>
          )}
        </CartContext.Consumer>
      </CartProvider>
    </MemoryRouter>,
  )

  // Add item to cart
  userEvent.click(screen.getByText(/add to cart/i))

  // initial screen
  const itemTitle = screen.getByText(/smart hub/i)
  const itemQuantity = screen.getByRole('quantity')
  const totalItemsPrice = screen.getByRole('price')

  expect(itemTitle).toBeInTheDocument()
  expect(itemQuantity).toHaveTextContent('1')
  expect(totalItemsPrice).toHaveTextContent('49.99€')

  // increase item quantity
  const increaseButton = screen.getByRole('button', {
    name: /\+/i,
  })
  userEvent.click(increaseButton)

  // descrease item quantity
  const descreaseButton = screen.getByRole('button', {
    name: /\-/i,
  })

  // Expect quantity to be 2
  expect(itemQuantity).toHaveTextContent('2')
  expect(totalItemsPrice).toHaveTextContent('99.98€')

  // Add another item
  userEvent.click(screen.getByText(/add to cart/i))
  expect(totalItemsPrice).toHaveTextContent('124.97€')

  // Decrease button on first element
  userEvent.click(descreaseButton)
  expect(itemQuantity).toHaveTextContent('1')

  // Expect to remove item on next decrease
  userEvent.click(descreaseButton)
  expect(itemTitle).not.toBeInTheDocument()
})
