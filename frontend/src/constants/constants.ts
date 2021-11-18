export const pageLinks = {
  '/': 'Home',
  '/cart': 'Cart',
  '/checkout': 'Checkout',
}

export interface PromotionCode {
  code: '20%OFF' | '5%OFF' | '20EUROFF'
  action: (price: number) => number
  validation: (appliedCodes: PromotionCode[], itemPrice: number) => boolean
}

export const promotionCodes: PromotionCode[] = [
  {
    code: '20%OFF',
    action: (price: number) => price * (1 - 0.2),
    validation: (appliedCodes: PromotionCode[], itemPrice: number) =>
      appliedCodes.length === 0 && itemPrice > 0,
  },
  {
    code: '5%OFF',
    action: (price: number) => price * (1 - 0.05),
    validation: (appliedCodes: PromotionCode[], itemPrice: number) => {
      return (
        !appliedCodes.find((item: PromotionCode) => item.code === '20%OFF') &&
        itemPrice > 0
      )
    },
  },
  {
    code: '20EUROFF',
    action: (price: number) => price - 20,
    validation: (appliedCodes: PromotionCode[], itemPrice: number) => {
      return (
        !appliedCodes.find((item: PromotionCode) => item.code === '20%OFF') &&
        itemPrice > 20
      )
    },
  },
]
