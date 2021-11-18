import React from 'react'
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap'
import PromotionCodeForm from '../components/PromotionCodeForm'
import PromotionCodeList from '../components/PromotionCodeList'
import { useCartContext } from '../contexts/cart'

const Cart = () => {
  const {
    cartItems,
    updateItemQuantity,
    itemsPrice,
    appliedCodes,
  } = useCartContext()

  return (
    <Container>
      <Row>
        <Col className="mt-4 mb-2">
          <h2>Cart overview</h2>
        </Col>
      </Row>
      <Row>
        {cartItems.map((cartItem) => (
          <Col xs={12} className="my-1" key={cartItem.item._id}>
            <Card>
              <Card.Body>
                <Card.Title>{cartItem.item.title}</Card.Title>
                <Card.Text>{cartItem.item.price}€</Card.Text>
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
          <PromotionCodeList />

          <PromotionCodeForm />
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="pt-4">Items price:</h4>
          <h2>{itemsPrice}€</h2>
        </Col>
      </Row>
    </Container>
  )
}

export default Cart
