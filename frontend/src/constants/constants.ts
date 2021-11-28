import { CartItem } from '../contexts/cart'

export const pageLinks = {
  '/': 'Home',
  '/cart': 'Cart',
}

export interface IQuantityDiscount {
  quantityForDiscount: number
  discountAmount: number
}

export const quantityDiscount: Record<string, IQuantityDiscount> = {
  '619fd21ffc105839e1c9ee49': {
    quantityForDiscount: 3,
    discountAmount: 10.0,
  },
  '619fd21ffc105839e1c9ee4b': {
    quantityForDiscount: 2,
    discountAmount: 5.0,
  },
}

type Deducationfactor = {
  factor: number
  amount: number
}

export const deducationFactor = (cartItem: CartItem): Deducationfactor => {
  if (quantityDiscount[cartItem.item._id]) {
    return {
      factor: Math.floor(
        cartItem.quantity /
          quantityDiscount[cartItem.item._id].quantityForDiscount,
      ),
      amount: quantityDiscount[cartItem.item._id].discountAmount,
    }
  }

  return {
    factor: 0,
    amount: 0,
  }
}

export const applyQuantityPromotion = (cartItem: CartItem): number => {
  const { factor, amount } = deducationFactor(cartItem)
  if (factor) {
    return (
      cartItem.quantity * cartItem.item.price -
      factor * amount +
      factor * quantityDiscount[cartItem.item._id].quantityForDiscount * 0.01
    )
  }
  return cartItem.quantity * cartItem.item.price - factor * amount
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
