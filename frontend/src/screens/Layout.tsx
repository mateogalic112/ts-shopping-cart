import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Nav, Button, Badge } from 'react-bootstrap'
import { pageLinks } from '../constants/constants'
import { useCartContext } from '../contexts/cart'

const Layout: FC = ({ children }) => {
  const navigate = useNavigate()
  const { totalItems } = useCartContext()

  return (
    <section>
      <nav className="bg-light">
        <Container>
          <Row>
            <Col className="d-flex align-items-center justify-content-between">
              <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
              >
                {Object.entries(pageLinks).map((item) => (
                  <Nav.Item className="my-4 me-4" key={item[0]}>
                    <Link to={item[0]}>{item[1]}</Link>
                  </Nav.Item>
                ))}
              </Nav>

              <Button variant="primary" onClick={() => navigate('/cart')}>
                Cart <Badge bg="secondary">{totalItems}</Badge>
                <span className="visually-hidden">items in cart</span>
              </Button>
            </Col>
          </Row>
        </Container>
      </nav>
      {children}
    </section>
  )
}

export default Layout
