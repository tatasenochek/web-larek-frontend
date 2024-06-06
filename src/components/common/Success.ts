import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Components";

interface ISuccess {
  total: number;
}

interface ISuccessActions {
  onClick: () => void;
}

export class Success extends Component<ISuccess> {
	protected _close: HTMLButtonElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);

		this._close = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.container
		);
		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	set result(value: string) {
		this._total.textContent = `Списано ${value} синапсов`;
	}
}