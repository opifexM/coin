import {Account} from "../../api/account-schema.ts";
import {store} from "../../store/store.ts";
import {SortType} from "../../type/sort-type.enum.ts";
import {getAccountCardComponent} from "../account-card/account-card.ts";
import './account-list.css';

function sortAccountList(accounts: Account[]): Account[] {
  switch (store.sortOption) {
    case SortType.BY_BALANCE:
      return accounts
        .slice()
        .sort((a, b) => b.balance - a.balance);
    case SortType.BY_ACCOUNT:
      return accounts
        .slice()
        .sort((a, b) => b.account.localeCompare(a.account));
    case SortType.BY_TRANSACTION:
      return accounts
        .slice()
        .sort((a, b) => a.transactions.length - b.transactions.length);
    default:
      return accounts;
  }
}

export function getAccountListComponent(accounts: Account[]): HTMLDivElement {
  const component = document.createElement('div');
  component.classList.add('account-list-component');

  const accountList = document.createElement('ul');
  accountList.classList.add('account-list-card');
  component.appendChild(accountList);

  sortAccountList(accounts).forEach((account) => {
    const accountCard = getAccountCardComponent(account);
    accountList.appendChild(accountCard);
  });

  return component;
}
