import axios from "axios"
import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string
    name: string
    price: number
  }>()

  const { id } = useParams()

  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza() {
      const apiKey = process.env.REACT_APP_MOCKAPI_KEY
      try {
        const { data } = await axios.get(
          `https://${apiKey}.mockapi.io/items/` + id
        )
        setPizza(data)
      } catch (error) {
        alert("Такої піци немає!")
        navigate("/")
      }
    }
    fetchPizza()
    window.scrollTo(0, 0)
  }, [])

  if (!pizza) {
    return (
      <div
        style={{
          height: "760px",
          fontSize: "32px",
          textAlign: "center",
          paddingTop: "180px",
        }}
      >
        Йде загрузка...
      </div>
    )
  }

  return (
    <div className="container wrapper_fullPizza">
      <img src={pizza.imageUrl} alt="img" />
      <div>
        <h2>{pizza.name}</h2>
        <h2>{pizza.price} грн</h2>
      </div>

      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizza
