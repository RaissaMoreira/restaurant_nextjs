import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { StateOne, StateThree, StateTwo } from "./types";

export const useStore = create(
  persist<StateOne>(
    (set) => ({
  selectedCategory: "pizza",
  cart: [],
  totalPrice: 0,

  changeCategory: (selectedCategory) =>
    set(() => ({ selectedCategory: selectedCategory })),

  cleanCart: () => {
    set({ cart: [], totalPrice: 0 });
  },

  updateObservations: (id, observations) =>
    set((state) => {
      const index = state.cart.findIndex((item) => item.id === id);
      if (index >= 0) {
        const updatedCartItem = {
          ...state.cart[index],
          observations: observations,
        };
        const updatedCart = [
          ...state.cart.slice(0, index),
          updatedCartItem,
          ...state.cart.slice(index + 1),
        ];
        return { cart: updatedCart };
      }
      return state;
    }),

  addToCart: (newItem, observations) =>
    set((state) => {
      const cartItem = state.cart.find((item) => item.id === newItem.id);
      const index = state.cart.findIndex((item) => item.id === newItem.id);

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
        const itemWithObservations = { ...newItem, quantity: 1, observations };
        return {
          cart: [...state.cart, itemWithObservations],
          totalPrice: state.totalPrice + newItem.price,
        };
      }
    }),

  deleteItem: (deleteItem) =>
    set((state) => {
      const index = state.cart.findIndex((item) => item.id === deleteItem.id);
      const cartItem = state.cart[index];

      if (cartItem && cartItem.quantity > 1) {
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
        const filteredCart = state.cart.filter(
          (item) => item.id !== deleteItem.id
        );
        const totalPrice = filteredCart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        return { cart: filteredCart, totalPrice };
      }
    }),

  totalItems: (state) => {
    return state.cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  },
}),
  {
    name: "cart-storage",
    getStorage: () => localStorage, // ou sessionStorage
  }
));

const persistConfig = {
  name: "form-storage",
  getStorage: () => localStorage, // ou sessionStorage
};

export const useFormStore = create(
  persist<StateTwo>(
    (set) => ({
      form: {
        name: "",
        celular: "",
        cep: "",
        street: "",
        number: "",
        city: "",
        state: "",
        neighborhood: "",
        deliveryType: "store",
        paymentType: "cartão",
      },
      dataForm: [],

      // address: {
      //   cep: "",
      //   street: "",
      //   number: "",
      //   city: "",
      //   state: "",
      //   neighborhood: "",
      // },
      // dataAddress: [],

      cleanValues: () =>
        set((prevState) => ({
          ...prevState,
          form: {
            ...prevState?.form,
            name: "",
            celular: "",
            cep: "",
            street: "",
            number: "",
            city: "",
            state: "",
            neighborhood: "",
            deliveryType: "store",
            paymentType: "cartão",
          },
        })),

      // cleanAddressValues: () =>
      //   set((prevState) => ({
      //     ...prevState,
      //     form: {
      //       ...prevState?.dataAddress,
      //       cep: "",
      //       street: "",
      //       number: "",
      //       city: "",
      //       state: "",
      //       neighborhood: "",
      //     },
      //   })),

      deleteAddress: () =>
        set((prevState) => {
          const { name, celular, paymentType, deliveryType } = prevState.form; // mantém apenas nome e celular
          return {
            ...prevState,
            form: {
              name,
              celular,
              deliveryType,
              paymentType,
            },
          };
        }),

      addDataForm: (newData) =>
        set((state) => ({
          dataForm: [...state.dataForm, { ...newData }],
        })),

      deleteData: (index) => {
        set((state) => {
          const newDataForm = [...state.dataForm];
          newDataForm.splice(index, 1);
          return { dataForm: newDataForm };
        });
      },

    }),
    persistConfig
  )
);

export const useAddressStore = create(
  persist<StateThree>(
    (set) => ({
      address: {
        cep: "",
        street: "",
        number: "",
        city: "",
        state: "",
        neighborhood: "",
      },
      dataAddress: [],

      addDataAddress: (newDataAddress) =>
        set((state) => ({
          dataAddress: [...state.dataAddress, { ...newDataAddress }],
        })),

      cleanAddressValues: () =>
        set((prevState) => ({
          ...prevState,
          address: {
            ...prevState?.address,
            cep: "",
            street: "",
            number: "",
            city: "",
            state: "",
            neighborhood: "",
          },
      })),
    }),
    {
      name: "address-storage",
      getStorage: () => localStorage,
    } // ou sessionStorage
  )
)
