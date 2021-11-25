import React, { FC, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { BASE_URL } from '../api/fetcher'
import mutate from '../api/mutate'
import SiteModal from '../components/Modal'
import { useCartContext } from '../contexts/cart'
import { APIOrder } from '../models/APIOrder'

const Checkout: FC = () => {
  const [showModal, setShowModal] = useState(false)

  const { cartItems, itemsPrice, customer, updateCustomer } = useCartContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const order: APIOrder = {
      customer,
      cartItems: cartItems.map((cartItem) => ({
        title: cartItem.item.title,
        price: cartItem.item.price,
        quantity: cartItem.quantity,
      })),
      totalPrice: itemsPrice,
    }

    await mutate(`${BASE_URL}/api/orders`, 'POST', order)
      .then((res) => res.json())
      .then(() => {
        setShowModal(true)
      })
  }

  return (
    <>
      <Container>
        <Row>
          <Col className="mt-4">
            <h2 className="mb-4">Checkout</h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  onChange={updateCustomer}
                  required
                  type="email"
                  placeholder="Enter email"
                  value={customer.email}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  onChange={updateCustomer}
                  type="text"
                  required
                  placeholder="1234 Main St"
                  value={customer.address}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCard">
                <Form.Label>Credit Card</Form.Label>
                <Form.Control
                  name="card"
                  required
                  onChange={updateCustomer}
                  type="tel"
                  pattern="[0-9\s]{13,19}"
                  placeholder="xxxx xxxx xxxx xxxx"
                  value={customer.card || ''}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit Order
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <SiteModal show={showModal} setShow={setShowModal} />
    </>
  )
}

export default Checkout
