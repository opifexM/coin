import {Currency} from "../../api/currency-schema.ts";
import './account-currency.css';

export function getAccountCurrencyComponent(accountCurrency: Currency): HTMLDivElement {
  const component = document.createElement('div');
  component.classList.add('account-currency-component');

  const title = document.createElement('p');
  title.textContent = 'Your Currencies';
  title.classList.add('account-currency-title');
  component.appendChild(title);

  const currencyList = document.createElement('ul');
  currencyList.classList.add('account-currency-list');
  component.appendChild(currencyList);

  for (const value of Object.values(accountCurrency)) {
    const {amount, code} = value;

    if (amount) {
      const item = document.createElement('li');
      item.classList.add('account-currency-item');
      currencyList.appendChild(item);

      const codeItem = document.createElement('span');
      codeItem.classList.add('account-currency-item-code');
      codeItem.textContent = code;
      item.appendChild(codeItem);

      const amountItem = document.createElement('span');
      amountItem.classList.add('account-currency-item-amount');
      amountItem.textContent = amount.toLocaleString();
      item.appendChild(amountItem);
    }
  }

  return component;
}
