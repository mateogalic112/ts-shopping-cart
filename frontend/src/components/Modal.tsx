import { FC } from 'react'
import { Button, ListGroup, Modal, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import {
  applyQuantityPromotion,
  deducationFactor,
  quantityDiscount,
} from '../constants/constants'
import { useCartContext } from '../contexts/cart'

interface ModalProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const SiteModal: FC<ModalProps> = ({ setShow, show }) => {
  const navigate = useNavigate()

  const {
    cartItems,
    itemsPrice,
    customer,
    resetCart,
    resetPromotionCodeList,
    appliedCodes,
  } = useCartContext()

  const handleClose = () => {
    resetCart()
    resetPromotionCodeList()
    setShow(false)
    navigate('/')
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mb-4">Woohoo, your order is completed!</h5>

          <p>Email: {customer.email}</p>
          <p>Address: {customer.address}</p>
          <p>Credit card: {customer.card}</p>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price per unit</th>
                <th>Discount</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem, index) => {
                const { amount, factor } = deducationFactor(cartItem)
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{cartItem.item.title}</td>
                    <td>{cartItem.quantity}</td>
                    <td>{cartItem.item.price}€</td>
                    <td>
                      {amount * factor -
                        factor *
                          quantityDiscount[cartItem.item._id]
                            .quantityForDiscount *
                          0.01}
                      €
                    </td>
                    <td>{applyQuantityPromotion(cartItem)}€</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>

          <>
            <h5 className="py-2">Applied promotions</h5>
            {appliedCodes.length > 0 && (
              <ListGroup className="mb-4">
                {appliedCodes.map((appliedCode) => (
                  <ListGroup.Item
                    as="li"
                    key={appliedCode.code}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>{appliedCode.code}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </>

          <div className="d-flex justify-content-between">
            <h5>Total: </h5>
            <h5>{itemsPrice}€</h5>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SiteModal
