import React from 'react'
import { Card, Button, Container, Col, Row } from 'react-bootstrap'
import useSWR from 'swr'
import { fetcher } from '../api/fetcher'
import { useCartContext } from '../contexts/cart'
import { Product } from '../models/Product'

const Home = () => {
  const { data: products } = useSWR<Product[]>('/api/products', fetcher)

  const { cartItems, addItemToCart } = useCartContext()

  if (!products) return <p>Loading...</p>

  return (
    <Container>
      <Row>
        <Col className="mt-4 mb-2">
          <h2>Products</h2>
        </Col>
      </Row>
      <Row>
        {products.map((product) => (
          <Col className="my-4" xs={12} md={6} lg={4} key={product._id}>
            <Card>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}€</Card.Text>
                <Button
                  className="d-block"
                  variant="primary"
                  onClick={() => addItemToCart({ item: product, quantity: 1 })}
                  disabled={
                    !!cartItems.find(
                      (cartItem) => cartItem.item._id === product._id,
                    )
                  }
                >
                  Buy
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Home
