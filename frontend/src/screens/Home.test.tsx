import { render, screen } from '@testing-library/react'

import Home from './Home'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}))

test('Displays title for each product from server', async () => {
  render(<Home />)

  // find titles
  const productTitles = await screen.findAllByRole('heading', { level: 5 })

  expect(productTitles).toHaveLength(3)

  // confirm titles are correct
  expect(productTitles.map((item) => item.textContent)).toEqual([
    'Smart Hub',
    'Motion Sensor',
    'Wireless Camera',
  ])
})
