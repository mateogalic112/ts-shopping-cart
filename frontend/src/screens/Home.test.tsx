import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { BASE_URL } from '../api/fetcher'
import { server } from '../mocks/server'

import Home from './Home'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}))

test('Receive server error while fetching products', async () => {
  server.resetHandlers(
    rest.get(`${BASE_URL}/api/products`, (req, res, ctx) =>
      res(ctx.status(500)),
    ),
  )

  const { queryByText, getByText } = render(<Home />)

  // initial loading header shows up
  expect(queryByText('Loading...')).toBeInTheDocument()

  // find error heading
  await waitFor(() => {
    expect(getByText('Error fetching products')).toBeInTheDocument()
  })

  // element is removed from DOM
  expect(queryByText('Loading...')).not.toBeInTheDocument()
})

test('Displays title for each product from server', async () => {
  render(<Home />)

  // find titles
  const productTitles = await screen.findAllByRole('heading', { level: 5 })

  // confirm title length
  expect(productTitles).toHaveLength(3)

  // confirm titles are correct
  expect(productTitles.map((item) => item.textContent)).toEqual([
    'Smart Hub',
    'Motion Sensor',
    'Wireless Camera',
  ])
})
