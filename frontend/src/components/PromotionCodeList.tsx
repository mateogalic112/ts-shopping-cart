import React, { FC } from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { useCartContext } from '../contexts/cart'

const PromotionCodeList: FC = () => {
  const { appliedCodes, removePromotionFromBasket } = useCartContext()

  return (
    <>
      <h5 className="pt-4 pb-2">Apply promotion</h5>
      {appliedCodes.length > 0 && (
        <ListGroup className="mb-2">
          {appliedCodes.map((appliedCode) => (
            <ListGroup.Item
              as="li"
              key={appliedCode.code}
              className="d-flex justify-content-between align-items-center"
            >
              <span>{appliedCode.code}</span>
              <Button
                variant="light"
                onClick={() => removePromotionFromBasket(appliedCode.code)}
              >
                X
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  )
}

export default PromotionCodeList
