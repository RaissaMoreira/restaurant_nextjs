export interface StateOne {
  totalPrice: any;
  cart: any[];
  selectedCategory: string;
  changeCategory: (selectedCategory: StateOne["selectedCategory"]) => void;
  addToCart: (newItem: any, observations: string) => void;
  deleteItem: (deleteItem: any) => void;
  totalItems: (state: StateOne) => number;
  updateObservations: (observations: string, id: number) => void;
  cleanCart: () => void;
}

export interface IForm {
  name: string;
  celular: string | number;
  cep?: string | number;
  street?: string;
  number?: string | number;
  city?: string;
  state?: string;
  neighborhood?: string;
  deliveryType: string;
  paymentType: string;
}

export interface StateTwo {
  form: {
    name: string;
    celular: string | number;
    cep: string | number;
    street: string;
    number: string | number;
    city: string;
    state: string;
    neighborhood: string;
    deliveryType: string;
    paymentType: string;
  };
  dataForm: any[];
  addDataForm: (newData: any) => void;
  cleanValues: () => void;
  deleteAddress: () => void;
  deleteData: (id: any) => void;
}


export interface StateThree {
  address: {
    cep: string | number;
    street: string;
    number: string | number;
    city: string;
    state: string;
    neighborhood: string;
  }

  dataAddress: any[];
  addDataAddress: (newDataAddress: any) => void;
  cleanAddressValues: () => void;
}