import { ensureElement } from "../utils/utils";
import { Component } from "./base/Components";


interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

interface Category {
  [key: string]: string;
}

const category: Category = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'другое': 'card__category_other',
  'дополнительное': 'card__category_additional',
};

interface ICard {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  index: string;
  inBasket: boolean;
}

export class Card extends Component<ICard> {
  protected _category?: HTMLElement;
  protected _title: HTMLElement;
  protected _description?: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _price: HTMLElement;
  protected _button?: HTMLButtonElement;
  protected _index?: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._category = container.querySelector('.card__category');
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._description = container.querySelector('.card__text');
    this._image = container.querySelector('.card__image');
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._button = container.querySelector('.card__button');
    this._index = container.querySelector('.basket__item-index');

    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  get id(): string {
    return this.container.dataset.id || '';
  }

  set category(value: string) {
    this._category.textContent = value;
    this._category.classList.add(category[value]);
  }

  get category(): string {
    return this._category.textContent || '';
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  get title(): string {
    return this._title.textContent || '';
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  disableButton(isDisabled: boolean) {
    if (this._button) {
      this.setDisabled(this._button, isDisabled);
    }
  }

  set price(value: number | null) {
    if (value !== null) {
      const priceView = `${value} синапсов`;
      this.setText(this._price, priceView);
    } else {
      console.log(this._button)
      this.setText(this._price, 'Бесценно');
    }
  }

  get price(): number {
    return Number(this._price.textContent || '');
  }

  set inBasket(value: boolean) {
    if (this._button) {
      this._button.disabled = value;
      this._button.textContent = value ? 'В корзине' : 'В корзину';
      if (value) {
        this._button.classList.add('in-basket');
      } else {
        this._button.classList.remove('in-basket');
      }
    }
  }

  set index(value: string) {
    this._index.textContent = value;
  }

  get index(): string {
    return this._index.textContent || '';
  }
}