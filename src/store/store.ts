import { create } from 'zustand'

type State = {
  selectedCategory: string
}

type Action = {
  changeCategory: (selectedCategory: State['selectedCategory']) => void
}

export const useStore = create<State & Action>((set) => ({
  selectedCategory: '',
  changeCategory: (selectedCategory) => set(() => ({ selectedCategory: selectedCategory }))
}))
