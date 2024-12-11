import {renderAccountPage} from "../../page/account-page/account-page.ts";
import {renderAtmPage} from "../../page/atm-page/atm-page.ts";
import {renderCurrencyPage} from "../../page/currency-page/currency-page.ts";
import {renderLoginPage} from "../../page/login-page/login-page.ts";
import {MenuType} from "../../type/menu-type.ts";
import './menu.css';

const handleAtmMenuClick = async (): Promise<void> => {
  await renderAtmPage();
};

const handleAccountsMenuClick = async (): Promise<void> => {
  await renderAccountPage();
};

const handleCurrencyMenuClick = async (): Promise<void> => {
  await renderCurrencyPage();
};

const handleLogoutMenuClick = async (): Promise<void> => {
  await renderLoginPage();
};

export function getMenuComponent(menuStatus: MenuType, isHideMenu: boolean = false): HTMLDivElement {
  const component = document.createElement('div');
  component.classList.add('menu-component');

  const title = document.createElement('h1');
  title.textContent = 'Coin.';
  component.appendChild(title);

  if (!isHideMenu) {
    const option = document.createElement('div');
    option.classList.add('menu-option');
    component.appendChild(option);

    const atm = document.createElement('button');
    atm.textContent = 'ATM';
    atm.disabled = menuStatus === MenuType.atm;
    option.appendChild(atm);
    atm.addEventListener('click', handleAtmMenuClick);

    const account = document.createElement('button');
    account.textContent = 'Accounts';
    account.disabled = menuStatus === MenuType.accounts;
    option.appendChild(account);
    account.addEventListener('click', handleAccountsMenuClick);

    const currency = document.createElement('button');
    currency.textContent = 'Currency';
    currency.disabled = menuStatus === MenuType.currency;
    option.appendChild(currency);
    currency.addEventListener('click', handleCurrencyMenuClick);

    const logout = document.createElement('button');
    logout.textContent = 'Logout';
    logout.disabled = menuStatus === MenuType.logout;
    option.appendChild(logout);
    logout.addEventListener('click', handleLogoutMenuClick);
  }

  return component;
}
