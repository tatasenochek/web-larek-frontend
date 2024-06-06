// Приложение
export interface ILarekApp {
  basket: IBasket[];
  cardsList: ICardItem[];
  preview: string | null;
  order: IOrder | null;
}

// Товар
export interface ICardItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  inBasket: boolean;
}

// Данные заказа
export interface IOrder {
  payment: string;
  address: string;
  email: string;
  phone: string;
  total: number;
  id: string[];
}

// Корзина
export interface IBasket {
  quantity: number;
  title: string;
  price: number;
  totalPrice: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;