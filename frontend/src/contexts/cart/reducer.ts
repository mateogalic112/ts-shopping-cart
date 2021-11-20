import { State, CartItem } from '.'
import { PromotionCode } from '../../constants/constants'
import ActionKind from './actions'

type Action =
  | { type: ActionKind.addItemToCart; payload: CartItem }
  | { type: ActionKind.removeItemFromCart; payload: string }
  | {
      type: ActionKind.updateItemQuantity
      payload: { id: string; quantity: number }
    }
  | { type: ActionKind.applyPromotionToBasket; payload: PromotionCode }
  | { type: ActionKind.removePromotionFromBasket; payload: string }
  | { type: ActionKind.resetPromotionCodeList }
  | { type: ActionKind.resetCart }

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
    case ActionKind.applyPromotionToBasket:
      return {
        ...state,
        appliedCodes: [...state.appliedCodes, action.payload],
      }
    case ActionKind.removePromotionFromBasket:
      return {
        ...state,
        appliedCodes: state.appliedCodes.filter(
          (appliedCode: PromotionCode) => appliedCode.code !== action.payload,
        ),
      }
    case ActionKind.resetPromotionCodeList:
      return {
        ...state,
        appliedCodes: [],
      }
    case ActionKind.resetCart:
      return {
        ...state,
        cartItems: [],
      }
    default:
      throw new Error('Action not allowed')
  }
}
