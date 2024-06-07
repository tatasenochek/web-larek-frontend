import { IOrder } from "../types";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/Events";
import { Form } from "./common/Form";


export class DeliveryOrderForm extends Form<IOrder> {
  protected _card: HTMLButtonElement;
  protected _cash: HTMLButtonElement;
  protected _address: HTMLInputElement;
  protected _contactButton: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._card = ensureElement<HTMLButtonElement>('.button.button_alt[name="card"]', this.container);
    this._cash = ensureElement<HTMLButtonElement>('.button.button_alt[name="cash"]', this.container);
    this._address = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
    this._contactButton = ensureElement<HTMLButtonElement>('.order__button', this.container);

    this._card.addEventListener('click', () => {
      this._setPaymentMethod('card');
    });

    this._cash.addEventListener('click', () => {
      this._setPaymentMethod('cash');
    });
  }

  private _setPaymentMethod(payment: string) {
    this.toggleClass(this._card, 'button_alt-active', payment === 'card');
    this.toggleClass(this._cash, 'button_alt-active', payment === 'cash');
    this.onInputChange('payment', payment);
    this.events.emit('order_change_payment_type', { payment });
  }

  set address(value: string) {
    this._address.value = value;
  }
}

export class ContactOrderForm extends Form<IOrder> {
  protected _email: HTMLInputElement;
  protected _phone: HTMLInputElement;
  protected _submitButton: HTMLButtonElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._email = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this._phone = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
    this._submitButton = ensureElement<HTMLButtonElement>('.button', this.container);

  }

  set email(value: string) {
    this._email.value = value;
  }

  set phone(value: string) {
    this._phone.value = value;
  }
}