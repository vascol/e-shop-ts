import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { calcTotalPrice } from "../../utils/calcTotalPrice"
import { getCartFromLS } from "../../utils/getCartFromLS"
import { RootState } from "../store"
import { CartItem, CartSliceState } from "./cartSliceTypes"

const { items, totalPrice } = getCartFromLS()

const initialState: CartSliceState = {
  pizzaItems: items,
  totalPrice: totalPrice,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizzaItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.pizzaItems.find(
        (obj) => obj.id === action.payload.id
      )

      if (findItem) {
        findItem.count++
      } else {
        state.pizzaItems.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = calcTotalPrice(state.pizzaItems)
    },
    minusPizzaItem(state, action: PayloadAction<string>) {
      const findItem = state.pizzaItems.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--
      }
      state.totalPrice = calcTotalPrice(state.pizzaItems)
    },
    removePizzaItem(state, action: PayloadAction<string>) {
      state.pizzaItems = state.pizzaItems.filter(
        (obj) => obj.id !== action.payload
      )
      state.totalPrice = calcTotalPrice(state.pizzaItems)
    },
    clearPizzaItems(state) {
      state.pizzaItems = []
      state.totalPrice = 0
    },
  },
})

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.pizzaItems.find((obj) => obj.id === id)

export const {
  addPizzaItem,
  minusPizzaItem,
  removePizzaItem,
  clearPizzaItems,
} = cartSlice.actions

export default cartSlice.reducer
