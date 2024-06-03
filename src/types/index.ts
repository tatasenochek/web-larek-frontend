// Приложение
export interface ILarekApp {
  basket: IBasket[];
  cardsList: ICardItem[];
  preview: string | null;
  order: IOrder | null;
}

// Товар
export interface ICardItem {
  _id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  inBasket: boolean;
}

// Данные заказа
export interface IOrder {
  payment: boolean;
  address: string;
  email: string;
  phone: string;
  cardsId: string[];
}

// Корзина
export interface IBasket {
  quantity: number;
  title: string;
  price: number;
  totalPrice: number;
}
