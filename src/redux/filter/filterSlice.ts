import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { FilterSliceState, Sort, SortPropertyEnum } from "./filterSliceTypes"

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  sort: {
    name: "популярністю",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  currentPage: 1,
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage)
        state.categoryId = Number(action.payload.categoryId)
        state.sort = action.payload.sort
      } else {
        state.currentPage = 1
        state.categoryId = 0
        state.sort = {
          name: "популярністю",
          sortProperty: SortPropertyEnum.RATING_DESC,
        }
      }
    },
  },
})

export const selectFilter = (state: RootState) => state.filter

export const {
  setSearchValue,
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
} = filterSlice.actions

export default filterSlice.reducer
