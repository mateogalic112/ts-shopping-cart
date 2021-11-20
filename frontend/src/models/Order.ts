import { CartItem } from '../contexts/cart'
import { Customer } from './Customer'

export interface Order {
  _id?: string
  customer: Customer
  cartItems: CartItem[]
  totalPrice: number
}
