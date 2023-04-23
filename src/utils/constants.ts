import { IconType } from "react-icons";
import { CiBurger, CiFries, CiIceCream, CiPizza, CiBeerMugFull } from "react-icons/ci";

interface IcategoriesList {
  label: string;
  icon: IconType;
  id: string;
}

export const categoriesList: IcategoriesList[] = [
  { label: 'Pizza', icon: CiPizza, id: 'pizza' },
  { label: 'Bebidas', icon: CiBeerMugFull, id: 'drinks' },
  { label: 'Doces', icon: CiIceCream, id: 'deserts' },
  { label: 'Combos', icon: CiFries, id: 'combo' },
  { label: 'Burguers', icon: CiBurger, id: 'burguers' }
]

export const nonDigitCharacters = /\D/g;