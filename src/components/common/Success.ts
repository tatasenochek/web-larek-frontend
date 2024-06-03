import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Components";

interface ISuccess {
  totalPrise: number;
}

interface ISuccessActions {
  onClick: () => void;
}

export class Success extends Component<ISuccess> {
  protected _close: HTMLElement;
  protected _totalPrice: HTMLElement;

  constructor(container: HTMLElement, actions: ISuccessActions) {
      super(container);

      this._close = ensureElement<HTMLElement>('.state__action', this.container);
      this._totalPrice = ensureElement<HTMLElement>('.order-success__close', this.container)

      if (actions?.onClick) {
          this._close.addEventListener('click', actions.onClick);
      }
  }

  set result(value: string) {
		this._totalPrice.textContent = `Списано ${value} синапсов`;
	}
}