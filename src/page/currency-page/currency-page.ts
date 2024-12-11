import {Currency} from "../../api/currency-schema.ts";
import {getAccountCurrency, getCurrencyList} from "../../api/currency.ts";
import {getCurrencyWebSocket} from "../../api/websocket-currency.ts";
import {renderPage} from "../../app.ts";
import {getAccountCurrencyComponent} from "../../component/account-currency/account-currency.ts";
import {getCurrencyDashboardComponent} from "../../component/currency-dashboard/currency-dashboard.ts";
import {getCurrencyExchangeComponent} from "../../component/currency-exchange/currency-exchange.ts";
import {getCurrencyMonitoringComponent} from "../../component/currency-monitoring/currency-monitoring.ts";
import {getMenuComponent} from "../../component/menu/menu.ts";
import {store} from "../../store/store.ts";
import {MenuType} from "../../type/menu-type.ts";
import './currency-page.css';

export async function renderCurrencyPage() {
  store.menuStatus = MenuType.currency;
  const currencies = await getCurrencyList();
  const accountCurrencies = await getAccountCurrency();
  getCurrencyWebSocket();
  renderPage(createCurrencyPage(currencies, accountCurrencies));
}

function createCurrencyPage(currencies: string[], accountCurrencies: Currency): HTMLDivElement {
  const page = document.createElement('div');
  page.classList.add('currency-page');

  const menuComponent = getMenuComponent(store.menuStatus);
  page.appendChild(menuComponent);

  const currencyComponent = getCurrencyDashboardComponent();
  page.appendChild(currencyComponent);

  const currencyPageAction = document.createElement('div');
  currencyPageAction.classList.add('currency-page-action');
  page.appendChild(currencyPageAction);

  const currencyPageExchange = document.createElement('div');
  currencyPageExchange.classList.add('currency-page-exchange');
  currencyPageAction.appendChild(currencyPageExchange);

  const accountCurrencyComponent = getAccountCurrencyComponent(accountCurrencies);
  currencyPageExchange.appendChild(accountCurrencyComponent);

  const currencyExchangeComponent = getCurrencyExchangeComponent(currencies);
  currencyPageExchange.appendChild(currencyExchangeComponent);

  const currencyPageMonitor = document.createElement('div');
  currencyPageMonitor.classList.add('currency-page-monitor');
  currencyPageAction.appendChild(currencyPageMonitor);

  const currencyMonitoringComponent = getCurrencyMonitoringComponent(store.exchangeRate);
  currencyPageMonitor.appendChild(currencyMonitoringComponent);

  return page;
}
