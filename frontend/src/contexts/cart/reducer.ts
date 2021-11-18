import { State, CartItem } from '.'
import ActionKind from './actions'

type Action =
  | { type: ActionKind.addItemToCart; payload: CartItem }
  | { type: ActionKind.removeItemFromCart; payload: string }
  | {
      type: ActionKind.updateItemQuantity
      payload: { id: string; quantity: number }
    }

export default function (state: State, action: Action): State {
  switch (action.type) {
    case ActionKind.addItemToCart:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      }
    case ActionKind.removeItemFromCart:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem: CartItem) => cartItem.item._id !== action.payload,
        ),
      }
    case ActionKind.updateItemQuantity:
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) => {
          if (cartItem.item._id === action.payload.id) {
            return { ...cartItem, quantity: action.payload.quantity }
          }
          return cartItem
        }),
      }
    default:
      throw new Error('Action not allowed')
  }
}
