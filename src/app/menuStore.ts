import { create } from 'zustand'

const useMenuStore = create((set) => ({
  isOpened: true,
  setIsOpen: (value:boolean) => set((state) => {
    return { isOpened: value }
  }),
}))

export default useMenuStore;