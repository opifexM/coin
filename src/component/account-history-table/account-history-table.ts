import {Account, Transaction} from "../../api/account-schema.ts";
import {ACCOUNT} from "../../const.ts";
import {renderAccountHistoryPage} from "../../page/account-history-page/account-history-page.ts";
import './account-history-table.css';
import {store} from "../../store/store.ts";

const handleHistoryTableClick = async (event: MouseEvent, account: Account): Promise<void> => {
  event.preventDefault();
  await renderAccountHistoryPage(account);
};

const handlePreviewButtonClick = (event: MouseEvent, account: Account): void => {
  event.preventDefault();
  store.historyPage--;
  updateAccountHistoryTableComponent(account, true);
};

const handleNextButtonClick = (event: MouseEvent, account: Account): void => {
  event.preventDefault();
  store.historyPage++;
  updateAccountHistoryTableComponent(account, true);
};

function addTransactionRow(table: HTMLTableElement, transaction: Transaction, account: string) {
  const {amount, from, to, date} = transaction;
  const isNegativeAmount = from === account;

  const tr = document.createElement('tr');
  table.appendChild(tr);

  const rowFrom = document.createElement('td');
  rowFrom.textContent = from;
  tr.appendChild(rowFrom);

  const rowTo = document.createElement('td');
  rowTo.textContent = to;
  tr.appendChild(rowTo);

  const rowAmount = document.createElement('td');
  rowAmount.textContent = `${isNegativeAmount ? '-' : '+'} $${amount.toLocaleString()}`;
  rowAmount.classList.add(isNegativeAmount
    ? 'account-history-amount-negative'
    : 'account-history-amount-positive')
  tr.appendChild(rowAmount);

  const rowDate = document.createElement('td');
  rowDate.textContent = (new Date(date)).toLocaleDateString();
  tr.appendChild(rowDate);
}

function generateAccountHistoryTableComponent(currentAccount: Account, component: HTMLDivElement | Element, isExtend = false): HTMLDivElement {
  const {account, transactions} = currentAccount;

  const control = document.createElement('div');
  control.classList.add('account-history-table-control');
  component.appendChild(control);

  const title = document.createElement('p');
  title.textContent = 'Translation History';
  title.classList.add('account-history-table-title');
  control.appendChild(title);

  if (isExtend) {
    const navigation = document.createElement('div');
    navigation.classList.add('account-history-table-navigation');
    control.appendChild(navigation);

    const previewButton = document.createElement('button');
    previewButton.classList.add('account-history-table-preview');
    previewButton.disabled = store.historyPage <= 0;
    navigation.appendChild(previewButton);
    previewButton.addEventListener('click', (event) => handlePreviewButtonClick(event, currentAccount));

    const nextButton = document.createElement('button');
    nextButton.classList.add('account-history-table-next');
    nextButton.disabled = store.historyPage * ACCOUNT.HISTORY_EXTEND_LIMIT >= transactions.length;
    navigation.appendChild(nextButton);
    nextButton.addEventListener('click', (event) => handleNextButtonClick(event, currentAccount));
  }

  const table = document.createElement('table');
  table.classList.add('account-history-table');
  component.appendChild(table);

  const thead = document.createElement('thead');
  table.appendChild(thead);

  const titleRow = document.createElement('tr');
  thead.appendChild(titleRow);

  const titleAccountFrom = document.createElement('th');
  titleAccountFrom.textContent = 'Account From';
  thead.appendChild(titleAccountFrom);

  const titleAccountTo = document.createElement('th');
  titleAccountTo.textContent = 'Account To';
  thead.appendChild(titleAccountTo);

  const titleAmount = document.createElement('th');
  titleAmount.textContent = 'Amount';
  thead.appendChild(titleAmount);

  const titleDate = document.createElement('th');
  titleDate.textContent = 'Date';
  thead.appendChild(titleDate);

  const sortedTransactions = transactions
    .slice()
    .sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime());

  const limit = isExtend ? ACCOUNT.HISTORY_EXTEND_LIMIT : ACCOUNT.HISTORY_LIMIT;
  const startIndex = isExtend ? store.historyPage * ACCOUNT.HISTORY_EXTEND_LIMIT : 0;
  const limitedTransaction = sortedTransactions.slice(startIndex, startIndex + limit);

  limitedTransaction.forEach((transaction) => {
    addTransactionRow(table, transaction, account);
  });

  return component as HTMLDivElement;
}

export function updateAccountHistoryTableComponent(currentAccount: Account, isExtend = false): void {
  const component = document.querySelector('.account-history-table-component');
  if (component) {
    component.innerHTML = '';
    generateAccountHistoryTableComponent(currentAccount, component, isExtend);
  }
}

export function getAccountHistoryTableComponent(currentAccount: Account, isExtend = false): HTMLDivElement {
  const component = document.createElement('div');
  component.classList.add('account-history-table-component');
  if (!isExtend) {
    component.addEventListener('click', (event) => handleHistoryTableClick(event, currentAccount));
  }

  return generateAccountHistoryTableComponent(currentAccount, component, isExtend);
}
