import React, { FC, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { PromotionCode, promotionCodes } from '../constants/constants'
import { useCartContext } from '../contexts/cart'

const PromotionCodeForm: FC = () => {
  const { applyPromotionToBasket, appliedCodes, itemsPrice } = useCartContext()

  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const promotionCode: PromotionCode | undefined = promotionCodes.find(
      (item: PromotionCode) => item.code === code,
    )

    if (appliedCodes.find((item) => item.code === code)) {
      setError('Code already applied!')
      return
    }

    if (
      promotionCode &&
      promotionCode?.validation(appliedCodes, itemsPrice) === ''
    ) {
      applyPromotionToBasket(promotionCode)
      setCode('')
      setError('')
    }

    setError(promotionCode?.validation(appliedCodes, itemsPrice) || '')
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      setError('')
    }, 5000)

    return () => clearTimeout(timer)
  }, [error])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-1" controlId="formPromotion">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form.Label>Promotion code</Form.Label>
        <Form.Control
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          placeholder="Enter code"
        />
        <Form.Text className="text-muted">Apply your promotion code</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Apply
      </Button>
    </Form>
  )
}

export default PromotionCodeForm
