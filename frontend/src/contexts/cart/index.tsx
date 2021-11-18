import React, {
  createContext,
  FC,
  useReducer,
  useContext,
  useMemo,
} from 'react'
import { Product } from '../../models/Product'

import ActionKind from './actions'
import cartReducer from './reducer'

interface ICartContext {
  cartItems: Array<CartItem>
  addItemToCart: (item: CartItem) => void
  removeItemFromCart: (id: string) => void
  updateItemQuantity: (id: string, quantity: number) => void
  itemsPrice: number
}

const initialContext: ICartContext = {
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  updateItemQuantity: () => {},
  itemsPrice: 0,
}

export interface CartItem {
  item: Product
  quantity: number
}

export type State = {
  cartItems: Array<CartItem>
}

const initialState: State = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') as string)
    : [],
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
  const [{ cartItems }, dispatch] = useReducer(cartReducer, initialState)

  const addItemToCart = (item: CartItem) => {
    dispatch({
      type: ActionKind.addItemToCart,
      payload: item,
    })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }

  const removeItemFromCart = (id: string) => {
    dispatch({
      type: ActionKind.removeItemFromCart,
      payload: id,
    })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      return removeItemFromCart(id)
    }
    dispatch({
      type: ActionKind.updateItemQuantity,
      payload: { id, quantity },
    })
  }

  const itemsPrice = useMemo(
    () =>
      parseFloat(
        cartItems
          .reduce(
            (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
            0,
          )
          .toFixed(2),
      ),
    [cartItems],
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        itemsPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
