import actions from "./actions"

export function cartReducer(state, action) => {
    switch (action.type) {
      case actions.addItemToCart:
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      default:
        throw new Error("Action not allowed");
    }
}