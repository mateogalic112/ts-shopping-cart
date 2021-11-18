import React, {
  useState,
  useEffect,
  createContext,
  FC,
  useReducer,
} from "react";

interface ICartContext {
  cartItems: Array<CartItem>;
}

interface CartItem {
  item: Product;
  quantity: number;
}

interface Product {
  title: string;
  price: number;
}

const defaultState = {
  cartItems: [],
};

const CartContext = createContext<ICartContext>(defaultState);

export const CartProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(null, defaultState);

  return <CartContext.Provider value={}>{children}</CartContext.Provider>;
};
