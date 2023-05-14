import { CartItem } from "../redux/cart/cartSliceTypes"

export const calcTotalPrice = (pizzaItems: CartItem[]) => {
  return pizzaItems.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}
