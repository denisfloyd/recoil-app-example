import { atom } from "recoil";
import { Product } from "types/product";

export const productsState = atom<Product[]>({
  key: "productsState",
  default: [],
});

// export const cartState = atom<Product[]>({
//   key: "productsState",
//   default: [],
// });