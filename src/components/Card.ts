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

// interface ICard<T> {
//   category: keyof Category;
//   title: string;
//   description: string | string[];
//   image: string;
//   price: number | null;
//   statusBasket: T;
//   index: number;
//   isInBasket?: boolean;
// }

// export class Card<T> extends Component<ICard<T>> {
//   protected _category: HTMLElement;
//   protected _title: HTMLElement;
//   protected _image: HTMLImageElement;
//   protected _price: HTMLElement;
//   protected _button: HTMLButtonElement;

//   constructor(container: HTMLElement, actions?: Pick<ICardActions, 'onClick'>) {
//     super(container)

//     this._category = container.querySelector('.card__category');
//     this._title = ensureElement<HTMLElement>('.card__title', container);
//     this._image = container.querySelector('.card__image');
//     this._price = ensureElement<HTMLElement>('.card__price', container);
//     this._button = container.querySelector('.card');

//     if (actions?.onClick) {
// 			if (this._button) {
// 				this._button.addEventListener('click', actions.onClick);
// 			} else {
// 				container.addEventListener('click', actions.onClick);
// 			}
// 		}
//   }

//   set id(value: string) {
//     this.container.dataset.id = value;
//   }

//   get id(): string {
//       return this.container.dataset.id || '';
//   }

//   set category(value: string) {
// 		this._category.textContent = value;
// 		this._category.classList.add(category[value]);
// 	}

// 	get category(): string {
// 		return this._category.textContent || '';
// 	}

//   set title(value: string) {
//       this.setText(this._title, value);
//   }

//   get title(): string {
//       return this._title.textContent || '';
//   }

//   set image(value: string) {
//       this.setImage(this._image, value, this.title)
//   }

//   set price(value: number | null) {
//     this.setText(this._price, (value !== null) ? `${value.toString()} синапсов` : '0 синапсов');
//   }

//   get price(): number | null {
//     const priceText = this._price.textContent?.replace(' синапсов', '') || '';
//     return priceText === '0' ? 0 : parseFloat(priceText);
//   }
// }

// export type CatalogCardStatus = {
//   status: boolean,
// };

// export class CatalogCard<T> extends Card<T> {
//   protected _description: HTMLElement;
//   protected _toggleBasket: HTMLButtonElement;
//   protected _isInBasket: boolean = false;

//   constructor(container: HTMLElement, actions?: Pick<ICardActions, 'toggleBasket'>) {
//     super(container);

//     this._description = container.querySelector('.card__text');
//     this._toggleBasket = container.querySelector('.button');

//     if (actions?.toggleBasket) {
//       this._toggleBasket.addEventListener('click', (event) => {
//         this.toggleBasketStatus();
//         actions.toggleBasket(event);
//       });
//     }
//   }

//   set description(value: string | string[]) {
//     if (Array.isArray(value)) {
//       this._description.replaceWith(...value.map(str => {
//         const descTemplate = this._description.cloneNode() as HTMLElement;
//         this.setText(descTemplate, str);
//         return descTemplate;
//       }));
//     } else {
//       this.setText(this._description, value);
//     }
//   }

//   toggleBasketStatus() {
//     this._isInBasket = !this._isInBasket;
//     this._toggleBasket.textContent = this._isInBasket ? 'Удалить из корзины' : 'Добавить в корзину';
//   }

//   set isInBasket(inBasket: boolean) {
//     this._isInBasket = inBasket;
//     this.setText(this._toggleBasket, inBasket ? 'Удалить из корзины' : 'Добавить в корзину');
//   }
// }

// export class BasketCardView<T> extends Card<T> {
//   protected _index: HTMLSpanElement;
//   protected _deleteBasket: HTMLButtonElement;


//   constructor(container: HTMLElement, events: Pick<ICardActions, 'deleteBasket'>) {
//       super(container);

//       this._index = container.querySelector('.basket__item-index');
//       this._deleteBasket = container.querySelector('.basket__item-delete');


//       if (this._deleteBasket) {
//           this._deleteBasket.addEventListener('click', (e) => {
//               events.deleteBasket(e);
//           });
//       }
//   }

//   set itemIndex(value: number) {
//       this.setText(this._index, value);
//   }
// }

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

  set price(value: number | null) {
    this.setText(
      this._price,
      value !== null ? `${value.toString()} синапсов` : 'Бесценно'
    );
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