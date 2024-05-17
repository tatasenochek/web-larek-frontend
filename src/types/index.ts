//Главная страница
export interface IAppMain {
  basket: IBasket[];
  cardsList: ICard[]
  preview: string | null;
  order: IOrder | null;
}

// Товар
export interface ICard {
  _id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
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
