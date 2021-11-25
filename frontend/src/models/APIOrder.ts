import { ICustomer } from '../contexts/cart'

export interface APIOrder {
  customer: ICustomer
  cartItems: {
    title: string
    price: number
    quantity: number
  }[]
  totalPrice: number
}
