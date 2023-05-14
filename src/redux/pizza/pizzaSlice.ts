import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { fetchPizzas } from "./asyncActions"
import { Pizza, PizzaSliceState, Status } from "./pizzaSliceTypes"

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
}

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzaItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setPizzaItems } = pizzaSlice.actions

export default pizzaSlice.reducer
