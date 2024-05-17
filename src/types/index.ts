//Главная страница
export interface IAppMain {
  basket: IBasket;
  cardsList: ICard[]
  preview: string | null;
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
}

// Корзина
export interface IBasket {
  quantity: number;
  title: string;
  price: number;
  totalPrice: number;
}

// API
export interface IApi {
  getCardList: () => Promise<ICard[]>;
  getCardItem: (id: string) => Promise<ICard>;
}

interface IModalData {
  content: HTMLElement;
}

interface IFormState {
  valid: boolean;
  errors: string[];
}

interface ISuccess {
  total: number;
}

interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}


// Ошибки полей формы 
export type FormErrors = Partial<Record<keyof IOrder, string>>;

// Корзина на главной странице
export type TBasketPablicInfo = Pick<IBasket, 'quantity'>;

// Карточки на главной странице
export type TCardPablicInfo = Pick<ICard, '_id' | 'image' | 'title' | 'category' | 'price'>;

// Модально окно карточки
export type TCardInfo = Pick<ICard, '_id' | 'description' | 'image' | 'title' | 'category' | 'price'>;

// Модальное окно корзины
export type TBasketInfo = Pick<IBasket, 'title' | 'price' | 'totalPrice'>;

// Модальные окна оформления заказа
export type TUserCheckout = Pick<IOrder, 'payment' | 'address' | 'email' | 'phone'>;

// Модальное окно успешного завершения заказа
export type TUserCheckoutComplieted = Pick<IBasket, 'totalPrice'>;

