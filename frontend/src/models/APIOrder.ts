export interface APIOrder {
  customer: {
    email: string
    address: string
    card: number
  }
  cartItems: {
    title: string
    price: number
    quantity: number
  }[]
  totalPrice: number
}
