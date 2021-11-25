import { CartItem, ICustomer } from '../contexts/cart'

export interface Order {
  _id?: string
  customer: ICustomer
  cartItems: CartItem[]
  totalPrice: number
}
