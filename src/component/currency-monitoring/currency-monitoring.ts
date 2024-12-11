import './currency-monitoring.css';
import {ExchangeRate} from "../../api/exchange-rate-schema.ts";
import {ACCOUNT} from "../../const.ts";
import {TrendType} from "../../type/trend-type.enum.ts";

function generateCurrencyComponent(component: HTMLDivElement | Element, exchangeRates: ExchangeRate[]): HTMLDivElement {
  const title = document.createElement('p');
  title.textContent = 'Real-time exchange rate changes';
  title.classList.add('currency-monitoring-title');
  component.appendChild(title);

  const currencyList = document.createElement('ul');
  currencyList.classList.add('currency-monitoring-list');
  component.appendChild(currencyList);

  const filteredExchangeRates = exchangeRates
    .toReversed()
    .slice(0, ACCOUNT.CURRENCY_LIMIT);
  filteredExchangeRates.forEach((exchangeRate) => {
    const {rate, to, from, change} = exchangeRate;
    const item = document.createElement('li');
    item.classList.add('currency-monitoring-item');
    currencyList.appendChild(item);

    const codeItem = document.createElement('span');
    codeItem.classList.add('currency-monitoring-item-code');
    codeItem.textContent = `${from}/${to}`;
    item.appendChild(codeItem);

    const amountItem = document.createElement('span');
    amountItem.classList.add('currency-monitoring-item-amount');
    amountItem.textContent = `${rate.toLocaleString()} `;

    const changeImg = document.createElement('img');
    changeImg.classList.add('currency-monitoring-item-change');
    switch (change) {
      case TrendType.Decrease:
        item.classList.add('is-negative');
        changeImg.src = 'image/down.svg';
        break;
      case TrendType.Increase:
        item.classList.add('is-positive');
        changeImg.src = 'image/up.svg';
        break;
      default:
        break;
    }
    amountItem.appendChild(changeImg);
    item.appendChild(amountItem);
  });

  return component as HTMLDivElement;
}

export function updateCurrencyMonitoringComponent(exchangeRates: ExchangeRate[]): void {
  const component = document.querySelector('.currency-monitoring-component');
  if (component) {
    component.innerHTML = '';
    generateCurrencyComponent(component, exchangeRates);
  }
}

export function getCurrencyMonitoringComponent(exchangeRates: ExchangeRate[]): HTMLDivElement {
  const component = document.createElement('div');
  component.classList.add('currency-monitoring-component');

  return generateCurrencyComponent(component, exchangeRates);
}
