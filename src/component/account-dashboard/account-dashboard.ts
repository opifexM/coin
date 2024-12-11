import './account-dashboard.css';
import {createAccount} from "../../api/account.ts";
import {renderAccountPage} from "../../page/account-page/account-page.ts";
import {hideLoader, showLoader} from "../../page/loader-page/loader-page.ts";
import {store} from "../../store/store.ts";
import {SortType} from "../../type/sort-type.enum.ts";

const handleCreateAccountClick = async (): Promise<void> => {
  const errorDiv = document.querySelector('#error');
  showLoader();

  try {
    await createAccount();
    await hideLoader();
    await renderAccountPage();
  } catch (error) {
    await hideLoader();
    if (errorDiv) {
      errorDiv.textContent = (error as Error).message || 'An unknown error occurred.';
    }
  }
};

async function handleSortSelected(event: Event) {
  const target = event.target as HTMLSelectElement;
  const selectedValue = target.value;
  switch (selectedValue) {
    case SortType.BY_ACCOUNT:
      store.sortOption = SortType.BY_ACCOUNT;
      await renderAccountPage();
      break;
    case SortType.BY_BALANCE:
      store.sortOption = SortType.BY_BALANCE;
      await renderAccountPage();
      break;
    case SortType.BY_TRANSACTION:
      store.sortOption = SortType.BY_TRANSACTION;
      await renderAccountPage();
      break;
    default:
      break;
  }
}

export function getAccountDashboardComponent(): HTMLDivElement {
  const component = document.createElement('div');
  component.classList.add('dashboard-component');

  const title = document.createElement('p');
  title.textContent = 'Accounts';
  title.classList.add('dashboard-title');
  component.appendChild(title);

  const select = document.createElement('select');
  select.id = 'sort';
  select.classList.add('dashboard-sort-select');
  component.appendChild(select);
  select.addEventListener('change', handleSortSelected);

  const accountOption = document.createElement('option');
  accountOption.value = SortType.BY_ACCOUNT;
  accountOption.textContent = 'By Last Account';
  select.appendChild(accountOption);

  const balanceOption = document.createElement('option');
  balanceOption.value = SortType.BY_BALANCE;
  balanceOption.textContent = 'By High Balance';
  select.appendChild(balanceOption);

  const transactionOption = document.createElement('option');
  transactionOption.value = SortType.BY_TRANSACTION;
  transactionOption.textContent = 'By Last Transaction';
  select.appendChild(transactionOption);
  select.value = store.sortOption;

  const create = document.createElement('button');
  create.textContent = 'Create New Account';
  create.classList.add('dashboard-create-button');
  component.appendChild(create);
  create.addEventListener('click', handleCreateAccountClick);

  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error');
  const errorText = document.createElement('p');
  errorText.id = 'error';
  errorDiv.appendChild(errorText);
  component.appendChild(errorDiv);

  return component;
}
