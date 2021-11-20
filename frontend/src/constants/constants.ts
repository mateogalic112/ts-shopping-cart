export const pageLinks = {
  '/': 'Home',
  '/cart': 'Cart',
}

export interface PromotionCode {
  code: '20%OFF' | '5%OFF' | '20EUROFF'
  action: (price: number) => number
  validation: (appliedCodes: PromotionCode[], itemPrice: number) => string
}

const totalPriceValidation = (price: number): boolean => price > 0

export const promotionCodes: PromotionCode[] = [
  {
    code: '20%OFF',
    action: (price: number) => price * (1 - 0.2),
    validation: (appliedCodes: PromotionCode[], itemPrice: number) => {
      if (appliedCodes.length > 0)
        return 'This code cannot be used with others!'
      if (!totalPriceValidation(itemPrice)) return 'Price cannot be 0'
      return ''
    },
  },
  {
    code: '5%OFF',
    action: (price: number) => price * (1 - 0.05),
    validation: (appliedCodes: PromotionCode[], itemPrice: number) => {
      if (appliedCodes.find((item: PromotionCode) => item.code === '20%OFF')) {
        return 'Cannot mix 20%OFF code with others!'
      }
      if (!totalPriceValidation(itemPrice)) return 'Price cannot be 0'
      return ''
    },
  },
  {
    code: '20EUROFF',
    action: (price: number) => price - 20,
    validation: (appliedCodes: PromotionCode[], itemPrice: number) => {
      if (appliedCodes.find((item: PromotionCode) => item.code === '20%OFF')) {
        return 'Cannot mix 20%OFF code with others!'
      }
      if (itemPrice <= 20) return 'Minimum price is 20.00€'
      return ''
    },
  },
]
