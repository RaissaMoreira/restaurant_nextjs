export interface StateOne {
  totalPrice: any;
  cart: any[];
  selectedCategory: string;
  changeCategory: (selectedCategory: StateOne["selectedCategory"]) => void;
  addToCart: (newItem: any, observations: string) => void;
  deleteItem: (deleteItem: any) => void;
  totalItems: (state: StateOne) => number;
  updateObservations: (observations: string, id: number) => void;
};

export interface StateTwo {
  form: {
    name: string;
    celular: string | number;
    cep: string | number;
    street: string;
    number: string | number;
    city: string;
  },
  dataForm: any[];
  addDataForm: (newData: any) => void;
  cleanValues: () => void;
  cleanAddressValues?: () => void;
};