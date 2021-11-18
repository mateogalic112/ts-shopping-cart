import React, { FC, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const Checkout: FC = () => {
  const [values, setValues] = useState({
    email: '',
    address: '',
    card: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log(values)
  }

  return (
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
  )
}

export default Checkout
