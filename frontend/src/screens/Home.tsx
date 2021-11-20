import React from 'react'
import { Card, Button, Container, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '../api/fetcher'
import { useCartContext } from '../contexts/cart'
import { Product } from '../models/Product'

const Home = () => {
  const { data: products, error } = useSWR<Product[]>('/api/products', fetcher)

  const { cartItems, addItemToCart } = useCartContext()

  const navigate = useNavigate()

  if (!products && !error)
    return (
      <Container>
        <Row>
          <Col className="mt-4 mb-2">
            <h2>Loading...</h2>
          </Col>
        </Row>
      </Container>
    )

  if (error)
    return (
      <Container>
        <Row>
          <Col className="mt-4 mb-2">
            <h2 style={{ color: 'red' }}>Error fetching products</h2>
          </Col>
        </Row>
      </Container>
    )

  return (
    <Container>
      <Row>
        <Col className="mt-4 mb-2">
          <h2>Products</h2>
        </Col>
      </Row>
      <Row>
        {products?.map((product) => (
          <Col className="my-4" xs={12} md={6} lg={4} key={product._id}>
            <Card>
              <Card.Body>
                <Card.Title as="h5">{product.title}</Card.Title>
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
      <Row className="pt-2">
        <Col>
          <Button
            variant="primary"
            className="mb-4"
            onClick={() => navigate('/cart')}
          >
            View cart
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
