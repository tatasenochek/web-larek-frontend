import _ from "lodash";
import { FormErrors, ICardItem, ILarekApp, IOrder } from "../types";
import { Model } from "./base/Model";

export type CatalogChangeEvent = {
  catalog: ICardItem[]
};

export interface IOrderForm {
  payment: string;
  address: string;
  email: string;
  phone: string;
}

export class AppData extends Model<ILarekApp> {
  basket: ICardItem[] = [];
  catalog: ICardItem[];
  order: IOrder = {
      payment: '',
      address: '',
      email: '',
      phone: '',
      total: 0,
      id: [],
  };
  preview: string | null;
  formErrors: FormErrors = {};

  // добавить товар в корзину
  addBasket(value: ICardItem) {
    if (this.basket.indexOf(value) < 0) {
      this.basket.push(value);
      this.emitChanges('basket:changed', this.basket);
    }
  }

  // удалить товар из корзины
  removeBasket(value: ICardItem) {
    this.basket = this.basket.filter((item) => item !== value);
    this.emitChanges('basket:changed', this.basket);
  }

  // очистить корзину
  clearBasket() {
    this.basket = [];
    this.emitChanges('basket:changed', this.basket);
  }

  // сумма всех товаров в корзине
  getTotalPrice() {
    let total = 0;
    this.basket.forEach((item) => {
      total += item.price;
    });
    return total;
  }

  // каталог товаров
  setCatalog(items: ICardItem[]) {
      this.catalog = items;
      this.emitChanges('items:changed', { catalog: this.catalog });
  }

  // предварительный просмотр
  setPreview(item: ICardItem) {
      this.preview = item.id;
      this.emitChanges('preview:changed', item);
  }

  // обновление поля формы
  setOrderField(field: keyof IOrderForm, value: string ) {
    this.order[field] = value;
    if (this.validateOrder()) {
        this.events.emit('order:ready', this.order);
    }
  }

  setContactField(field: keyof IOrderForm, value: string ) {
    this.order[field] = value;
    if (this.validateContact()) {
        this.events.emit('contact:ready', this.order);
    }
  }

  // валидация формы заказа
  validateOrder() {
      const errors: typeof this.formErrors = {};
      if (!this.order.email) {
          errors.email = 'Необходимо указать email';
      }
      if (!this.order.phone) {
          errors.phone = 'Необходимо указать телефон';
      }
      this.formErrors = errors;
      this.events.emit('formErrors:change', this.formErrors);
      return Object.keys(errors).length === 0;
  }

  validateContact() {
    const errors: typeof this.formErrors = {};
    if (!this.order.email) {
        errors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
        errors.phone = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
}

  // очистить форму заказа
  resetOrderForm() {
		this.order = {
			payment: '',
			address: '',
			email: '',
			phone: '',
			total: 0,
			id: [],
		};
	}

  orderData() {
    this.order.id = [];
    this.basket.forEach((item) => {
      this.order.id.push(item.id);
    });
    this.order.total = this.getTotalPrice();
  }
}