import React from 'react'
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import PromotionCodeForm from '../components/PromotionCodeForm'
import PromotionCodeList from '../components/PromotionCodeList'
import { useCartContext } from '../contexts/cart'

const Cart = () => {
  const {
    cartItems,
    updateItemQuantity,
    itemsPrice,
    totalItems,
  } = useCartContext()

  const navigate = useNavigate()

  return (
    <Container className="pb-4">
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
                <Card.Title as="h5">{cartItem.item.title}</Card.Title>
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
                <span className="px-4" role="quantity">
                  {cartItem.quantity}
                </span>
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
      {totalItems > 0 && (
        <Row>
          <Col>
            <PromotionCodeList />

            <PromotionCodeForm />
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <h4 className="pt-4">Items price:</h4>
          <h2 role="price">{itemsPrice}€</h2>
        </Col>
      </Row>
      {totalItems > 0 && (
        <Row className="pt-2">
          <Col>
            <Button
              variant="primary"
              className="mb-4"
              onClick={() => navigate('/checkout')}
            >
              Proceed to checkout
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default Cart
