import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import Home from './Home'
import Layout from './Layout'
import { CartProvider } from '../contexts/cart/index'

test('Navigation total badge updates on product buy click', async () => {
  render(
    <MemoryRouter>
      <Layout>
        <Home />
      </Layout>
    </MemoryRouter>,
    { wrapper: CartProvider },
  )

  // find badge with total items amount
  const totalBadge = screen.getByRole('total')

  expect(totalBadge.textContent).toBe('0')

  // find buy buttons on page
  const buyButtons = await screen.findAllByText('Buy')

  expect(buyButtons.length).toBe(3)

  // click first buy button
  const firstButton = buyButtons[0]
  userEvent.click(firstButton)

  // check that button is disabled after click
  expect(firstButton).toBeDisabled()

  // check if total items amount increases
  expect(totalBadge).toHaveTextContent('1')
})
