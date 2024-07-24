import { create } from 'zustand'

const useMenuStore = create((set) => ({
  isOpened: true,
  setIsOpen: (value:boolean) => set((state) => {
    console.log("value", value)
    return { isOpened: value }
  }),
}))

export default useMenuStore;