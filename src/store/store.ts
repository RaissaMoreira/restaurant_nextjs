import { create } from 'zustand'

type State = {
  totalPrice: any;
  cart: any[];
  selectedCategory: string
  changeCategory: (selectedCategory: State['selectedCategory']) => void;
  addToCart: (newItem: any) => void;
  deleteItem: (deleteItem: any) => void;
  totalItems: (state: State) => number;
};

export const useStore = create<State>((set) => ({
  selectedCategory: 'pizza',
  cart: [],
  totalPrice: 0,

  changeCategory: (selectedCategory) => set(() => ({ selectedCategory: selectedCategory })),

  addToCart: (newItem) => set((state) => {
    const cartItem = state.cart.find(item => item.id === newItem.id);
    const index = state.cart.findIndex(item => item.id === newItem.id);

    /*
    se o item já existir no carrinho, criado um novo objeto
    updatedCartItem que é uma cópia do item atual do carrinho,
    mas com a propriedade quantity atualizada.
    criado uma nova matriz updatedCart com todos os elementos
    do estado atual state.cart, exceto o item atualizado no índice index
    e adicionamos o updatedCartItem atualizado em seu lugar.
    */
  
    if (cartItem) {
      const updatedCartItem = {
        ...cartItem,
        quantity: cartItem.quantity + 1,
      };
      const updatedCart = [
        ...state.cart.slice(0, index),
        updatedCartItem,
        ...state.cart.slice(index + 1),
      ];
      const totalPrice = updatedCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return { cart: updatedCart, totalPrice };
    } else {
      /*
      Se o item não existir no carrinho,
      criado um novo objeto que é uma cópia de newItem 
      com a propriedade quantity definida como 1
      */
      return { cart: [...state.cart, { ...newItem, quantity: 1 }],
      totalPrice: state.totalPrice + newItem.price, };
    }
  }),

  deleteItem: (deleteItem) => set((state) => {
    const index = state.cart.findIndex(item => item.id === deleteItem.id);
    const cartItem = state.cart[index];

    if (cartItem && cartItem.quantity > 1){
      const updatedCartItem = {
        ...cartItem,
        quantity: cartItem.quantity - 1,
      };

      const updatedCart = [
        ...state.cart.slice(0, index),
        updatedCartItem,
        ...state.cart.slice(index + 1),
      ];
      const totalPrice = updatedCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return { cart: updatedCart, totalPrice };
    } else {
      const filteredCart = state.cart.filter((item) => item.id !== deleteItem.id);
      const totalPrice = filteredCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      return { cart: filteredCart, totalPrice };
    }
  }),

  totalItems: (state) => {
    return state.cart.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0)
  }
}))
