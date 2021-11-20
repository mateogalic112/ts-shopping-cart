import React, {
  createContext,
  FC,
  useReducer,
  useContext,
  useMemo,
} from 'react'
import { PromotionCode } from '../../constants/constants'
import { Product } from '../../models/Product'

import ActionKind from './actions'
import cartReducer from './reducer'

interface ICartContext {
  cartItems: Array<CartItem>
  appliedCodes: Array<PromotionCode>
  addItemToCart: (item: CartItem) => void
  removeItemFromCart: (id: string) => void
  resetCart: () => void
  updateItemQuantity: (id: string, quantity: number) => void
  applyPromotionToBasket: (code: PromotionCode) => void
  removePromotionFromBasket: (code: string) => void
  resetPromotionCodeList: () => void
  totalItems: number
  itemsPrice: number
}

const initialContext: ICartContext = {
  cartItems: [],
  appliedCodes: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  resetCart: () => {},
  updateItemQuantity: () => {},
  applyPromotionToBasket: () => {},
  removePromotionFromBasket: () => {},
  resetPromotionCodeList: () => {},
  totalItems: 0,
  itemsPrice: 0,
}

export interface CartItem {
  item: Product
  quantity: number
}

export type State = {
  cartItems: Array<CartItem>
  appliedCodes: Array<PromotionCode>
}

const initialState: State = {
  cartItems: [],
  appliedCodes: [],
}

const CartContext = createContext<ICartContext>(initialContext)

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error(`Cart context must be called within Cart context provider!`)
  }
  return context
}

export const CartProvider: FC = ({ children }) => {
  const [{ cartItems, appliedCodes }, dispatch] = useReducer(
    cartReducer,
    initialState,
  )

  const addItemToCart = (item: CartItem) => {
    dispatch({
      type: ActionKind.addItemToCart,
      payload: item,
    })
  }

  const removeItemFromCart = (id: string) => {
    dispatch({
      type: ActionKind.removeItemFromCart,
      payload: id,
    })
  }

  const resetCart = () => {
    dispatch({
      type: ActionKind.resetCart,
    })
  }

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeItemFromCart(id)

      dispatch({
        type: ActionKind.resetPromotionCodeList,
      })

      return
    }
    dispatch({
      type: ActionKind.updateItemQuantity,
      payload: { id, quantity },
    })
  }

  const removePromotionFromBasket = (code: string) => {
    if (!appliedCodes.some((appliedCode) => appliedCode.code === code)) return

    dispatch({
      type: ActionKind.removePromotionFromBasket,
      payload: code,
    })
  }

  const resetPromotionCodeList = () => {
    dispatch({
      type: ActionKind.resetPromotionCodeList,
    })
  }

  const totalItems = useMemo(
    () => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0),
    [cartItems],
  )

  const itemsPrice = useMemo(() => {
    const price: number = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
      0,
    )

    return parseFloat(
      appliedCodes
        .reduce((acc: number, item: PromotionCode) => item.action(acc), price)
        .toFixed(2),
    )
  }, [cartItems, appliedCodes])

  const applyPromotionToBasket = (promotionCode: PromotionCode) => {
    if (
      appliedCodes.some(
        (appliedCode) => appliedCode.code === promotionCode.code,
      )
    )
      return

    if (!promotionCode.validation(appliedCodes, itemsPrice)) return

    dispatch({
      type: ActionKind.applyPromotionToBasket,
      payload: promotionCode,
    })
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        appliedCodes,
        addItemToCart,
        removeItemFromCart,
        resetCart,
        updateItemQuantity,
        applyPromotionToBasket,
        removePromotionFromBasket,
        resetPromotionCodeList,
        totalItems,
        itemsPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
