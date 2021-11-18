import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useCartContext } from '../contexts/cart'

const Cart = () => {
  const { cartItems, updateItemQuantity, itemsPrice } = useCartContext()

  return (
    <Container>
      <Row>
        {cartItems.map((cartItem) => (
          <Col className="my-4" xs={12} md={6} lg={4} key={cartItem.item._id}>
            <Card>
              <Card.Body>
                <Card.Title>{cartItem.item.title}</Card.Title>
                <Card.Text>{cartItem.item.price}$</Card.Text>
                <Button
                  variant="light"
                  size={'sm'}
                  onClick={() =>
                    updateItemQuantity(cartItem.item._id, cartItem.quantity - 1)
                  }
                >
                  -
                </Button>
                <span className="px-4">{cartItem.quantity}</span>
                <Button
                  variant="light"
                  size={'sm'}
                  onClick={() =>
                    updateItemQuantity(cartItem.item._id, cartItem.quantity + 1)
                  }
                >
                  +
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <h4 className="pt-4">Items price:</h4>
          <h2>{itemsPrice}$</h2>
        </Col>
      </Row>
    </Container>
  )
}

export default Cart
