import { AppData, CatalogChangeEvent, IOrderForm } from './components/AppData';
import { Card } from './components/Card';
import { LarekAPI } from './components/LarekAPI';
import { ContactOrderForm, DeliveryOrderForm } from './components/Order';
import { Page } from './components/Page';
import { EventEmitter } from './components/base/Events';
import { Basket } from './components/Basket';
import { Modal } from './components/common/Modal';
import { Success } from './components/Success';
import './scss/styles.scss';
import { ICardItem, IOrder } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';


const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL)

// Все шаблоны
const successTemplate = ensureElement<HTMLTemplateElement>('#success')
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog')
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview')
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket')
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket')
const orderTemplate = ensureElement<HTMLTemplateElement>('#order')
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts')

// Модель данных приложения
const appData = new AppData({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const deliveryOrderForm = new DeliveryOrderForm(cloneTemplate(orderTemplate), events);
const contactOrderForm = new ContactOrderForm(cloneTemplate(contactsTemplate), events)

// логика

// Изменились элементы каталога
events.on<CatalogChangeEvent>('items:changed', () => {
  page.catalog = appData.catalog.map(item => {
    const card = new Card(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('card:select', item)
    });
    return card.render({
      category: item.category,
      title: item.title,
      image: item.image,
      price: item.price,
    });
  });
});

// Открыть карточку
events.on('card:select', (item: ICardItem) => {
  appData.setPreview(item);
});

// изменена открытая карточка
events.on('preview:changed', (item: ICardItem) => {
  const card = new Card(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      if (!item.inBasket) {
        events.emit('basket:add', item);
      }
    }
  });
  modal.render({
    content: card.render({
      category: item.category,
      title: item.title,
      description: item.description,
      image: item.image,
      price: item.price,
      inBasket: item.inBasket,
    })
  })
  if (item.price === null) {
    card.disableButton(true)
  }
});

// добавить карточку в корзину
events.on('basket:add', (item: ICardItem) => {
  item.inBasket = true;
  appData.addBasket(item);
  page.counter = appData.basket.length;
  modal.close();
});

// удалить товар из корзины
events.on('product:delete', (item: ICardItem) => {
  item.inBasket = false;
  appData.removeBasket(item);
  page.counter = appData.basket.length;
});

// изменения в корзине
events.on('basket:changed', (items: ICardItem[]) => {
  basket.items = items.map((item, index) => {
    const card = new Card(cloneTemplate(cardBasketTemplate), {
      onClick: () => {
        events.emit('product:delete', item),
          (item.inBasket = false),
          appData.removeBasket(item);
        page.counter = appData.basket.length;
      },
    });
    return card.render({
      id: item.id,
      title: item.title,
      price: item.price,
      index: `${index + 1}`,
    });
  });
  basket.total = appData.getTotalPrice();
  appData.order.total = appData.getTotalPrice();
});

// открыть корзину
events.on('basket:open', () => {
  modal.render({
    content: basket.render({}),
  });
});

// открыть форму заказа
events.on('order:open', () => {
  modal.render({
    content: deliveryOrderForm.render({
      payment: 'card',
      address: '',
      valid: false,
      errors: [],
    }),
  });
});

// ошибки формы
events.on('formErrors:change', (errors: Partial<IOrder>) => {
  const { payment, address, email, phone } = errors;

  deliveryOrderForm.valid = !payment && !address;
  deliveryOrderForm.errors = Object.values({ payment, address }).filter((i) => !!i);

  contactOrderForm.valid = !email && !phone;
  contactOrderForm.errors = Object.values({ email, phone }).filter((i) => !!i);
});

// изменилось одно из полей
events.on(
  /^order\..*:change/,
  (data: { field: keyof IOrderForm; value: string }) => {
    appData.setOrderField(data.field, data.value);
  }
);

events.on(
  /^contacts\..*:change/,
  (data: { field: keyof IOrderForm; value: string }) => {
    appData.setContactField(data.field, data.value);
  }
);

// проверка формы заказа
events.on('order:ready', () => {
  deliveryOrderForm.valid = true;
});

events.on('order:submit', () => {
  modal.render({
    content: contactOrderForm.render({
      email: '',
      phone: '',
      valid: false,
      errors: [],
    }),
  });
})

// проверка формы котактов
events.on('contacts:ready', () => {
  contactOrderForm.valid = true;
});

// отправка заказа
events.on('contacts:submit', () => {
  appData.orderData();
  const orderWithItems = {
    ...appData.order,
    items: appData.basket.map(item => item.id)
  };

  api
    .orderCards(orderWithItems)
    .then((res) => {
      const success = new Success(cloneTemplate(successTemplate), {
        onClick: () => {
          modal.close();
        },
      });
      appData.resetOrderForm();
      appData.clearBasket();
      page.counter = appData.basket.length;
      success.result = res.total.toString();
      modal.render({
        content: success.render({}),
      });
    })
    .catch((err) => {
      console.error('Ошибка при отправке заказа:', err);
    });
});

// Блокируем прокрутку страницы если открыта модалка 
events.on('modal:open', () => {
  page.locked = true;
});

// ... и разблокируем 
events.on('modal:close', () => {
  page.locked = false;
});

// Получаем товары с сервера 
api
  .getCardList()
  .then(appData.setCatalog.bind(appData))
  .catch((err) => {
    console.error(err);
  });
