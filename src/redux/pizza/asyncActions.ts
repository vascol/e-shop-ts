import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Pizza, SearchPizzaParams } from "./pizzaSliceTypes"

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const apiKey = process.env.REACT_APP_MOCKAPI_KEY
    const { sortBy, order, category, search, currentPage } = params
    const { data } = await axios.get<Pizza[]>(
      `https://${apiKey}.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}${currentPage}`
    )

    return data
  }
)
