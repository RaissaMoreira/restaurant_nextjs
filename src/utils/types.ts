export interface IFood {
  description: string;
  id: number | string;
  name: string;
  offer: boolean;
  price: number;
  quantity?: number
}