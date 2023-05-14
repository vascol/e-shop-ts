import React from "react"
import { Link } from "react-router-dom"
import cartEmptyImg from "../assets/img/empty-cart.png"

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Кошик порожній <span>😕</span>
      </h2>
      <p>Скоріш за все, ви нічого не замовили.</p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Повернутися назад</span>
      </Link>
    </div>
  )
}

export default CartEmpty
