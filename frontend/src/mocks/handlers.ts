import { rest } from 'msw'
import { BASE_URL } from '../api/fetcher'

export const handlers = [
  rest.get(`${BASE_URL}/api/products`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          _id: 1,
          title: 'Smart Hub',
          price: 49.99,
        },
        {
          _id: 2,
          title: 'Motion Sensor',
          price: 24.99,
        },
        {
          _id: 3,
          title: 'Wireless Camera',
          price: 99.99,
        },
      ]),
    )
  }),
]
