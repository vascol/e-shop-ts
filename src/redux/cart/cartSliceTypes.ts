export type CartItem = {
  id: string
  name: string
  price: number
  imageUrl: string
  sizes: number
  types: string
  count: number
}

export interface CartSliceState {
  totalPrice: number
  pizzaItems: CartItem[]
}
