import React, { FC, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { BASE_URL } from '../api/fetcher'
import mutate from '../api/mutate'
import SiteModal from '../components/Modal'
import { useCartContext } from '../contexts/cart'
import { APIOrder } from '../models/APIOrder'
import { Customer } from '../models/Customer'

const Checkout: FC = () => {
  const [showModal, setShowModal] = useState(false)

  const {
    cartItems,
    itemsPrice,
    resetCart,
    resetPromotionCodeList,
  } = useCartContext()

  const [values, setValues] = useState<Customer>({
    email: '',
    address: '',
    card: undefined,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const order: APIOrder = {
      customer: {
        email: values.email,
        address: values.address,
        card: values.card as number,
      },
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
        resetCart()
        resetPromotionCodeList()
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
                  onChange={handleChange}
                  required
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="1234 Main St"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCard">
                <Form.Label>Credit Card</Form.Label>
                <Form.Control
                  name="card"
                  required
                  onChange={handleChange}
                  type="tel"
                  pattern="[0-9\s]{13,19}"
                  placeholder="xxxx xxxx xxxx xxxx"
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
