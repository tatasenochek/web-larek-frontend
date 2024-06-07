import { EventTypes } from "../types";
import { createElement, ensureElement } from "./../utils/utils";
import { Component } from "./base/Components";
import { EventEmitter } from "./base/Events";

interface IBasketView {
    items: HTMLElement[];
    total: number;
}

export class Basket extends Component<IBasketView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__button');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit(EventTypes.ORDER_OPEN);
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._list.replaceChildren(...items);
            this.setDisabled(this._button, false);
        } else {
            const emptyMessage = createElement<HTMLParagraphElement>('p');
            this.setText(emptyMessage, 'Корзина пуста');
            this._list.replaceChildren(emptyMessage);
            this.setDisabled(this._button, true);
        }
    }

    set total(total: number) {
        this.setText(this._total, `${total.toString()} синапсов`);
    }
}