import React from "react"
import { Categories } from "../components/Categories"
import PizzaBlock from "../components/PizzaBlock/PizzaBlock"
import { Sort } from "../components/Sort"
import Skeleton from "../components/PizzaBlock/Skeleton"
import Pagination from "../components/Pagination/Pagination"
import { useSelector } from "react-redux"
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
} from "../redux/filter/filterSlice"
import { selectPizzaData } from "../redux/pizza/pizzaSlice"
import { useAppDispatch } from "../redux/store"
import { fetchPizzas } from "../redux/pizza/asyncActions"

const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const { categoryId, searchValue, currentPage, sort } =
    useSelector(selectFilter)

  const { items, status } = useSelector(selectPizzaData)

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "")
    const order = sort.sortProperty.includes("-") ? "asc" : "desc"
    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const search = searchValue ? `&search=${searchValue}` : ""
    const pagination = `&page=${currentPage}&limit=8`

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(pagination),
      })
    )
    window.scrollTo(0, 0)
  }

  React.useEffect(() => {
    getPizzas()
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)

  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ))

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Виникла помилка 😕</h2>
          <p>Нажаль, не вдалося отримати піци. Спробуйте пізніше.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home
