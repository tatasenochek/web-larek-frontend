// Товар
export interface ICard {
  _id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Данные пользователя
export interface IUser {
  payment: boolean;
  address: string;
  email: string;
  phone: string;
}

// Корзина
export interface IBasket {
  quantity: number;
  title: string;
  price: number;
  totalPrice: number;
}

// Каталог товаров
export interface ICardsData {
  cards: ICard[];
  preview: string | null;
  addBasket(cardId: string, payload: Function | null): void;
  deleteProduct(cardId: string, payload: Function | null): void;
}

// Модель хранения данных пользователя
export interface IUserData {
  getUserInfo(): TUserCheckout;
  setUserInfo(userData: IUser): void;
  checkValidation(data: Record<keyof TUserCheckout, boolean | string | number>): boolean;
}

// Модель хранения данных корзины
export interface IBasketData {
  cards: ICard[];
  deleteProduct(cardId: string, payload: Function | null): void;
}

// Корзина на главной странице
export type TBasketPablicInfo = Pick<IBasket, 'quantity'>;

// Карточки на главной странице
export type TCardPablicInfo = Pick<ICard, '_id' | 'image' | 'title' | 'category' | 'price'>;

// Модально окно карточки
export type TCardInfo = Pick<ICard, '_id' | 'description' | 'image' | 'title' | 'category' | 'price'>;

// Модальное окно корзины
export type TBasketInfo = Pick<IBasket, 'title' | 'price' | 'totalPrice'>;

// Модальные окна оформления заказа
export type TUserCheckout = Pick<IUser, 'payment' | 'address' | 'email' | 'phone'>;

// Модальное окно успешного завершения заказа
export type TUserCheckoutComplieted = Pick<IBasket, 'totalPrice'>;

