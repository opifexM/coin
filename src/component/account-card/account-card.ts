import {Account} from "../../api/account-schema.ts";
import {renderAccountDetailPage} from "../../page/account-detail-page/account-detail-page.ts";
import './account-card.css';

const handleAccountCardDetailClick = async (event: MouseEvent, account: Account): Promise<void> => {
  event.preventDefault();
  await renderAccountDetailPage(account.account);
};

export function getAccountCardComponent(currentAccount: Account) {
  const component = document.createElement('li');
  component.classList.add('account-card-component');

  const account = document.createElement('p');
  account.textContent = currentAccount.account;
  account.classList.add('account-card-number');
  component.appendChild(account);

  const balance = document.createElement('p');
  balance.textContent = `$${currentAccount.balance}`;
  balance.classList.add('account-card-balance');
  component.appendChild(balance);

  const transactionTitle = document.createElement('p');
  transactionTitle.textContent = 'Last Transaction:';
  transactionTitle.classList.add('account-card-transaction-title');
  component.appendChild(transactionTitle);

  const transaction = document.createElement('p');
  if (currentAccount.transactions.length) {
    const latestDate = new Date(Math.max(...currentAccount.transactions
      .map(transaction => new Date(transaction.date).getTime())));
    transaction.textContent = latestDate.toLocaleDateString();
  } else {
    transaction.textContent = 'No transaction data';
  }
  transaction.classList.add('account-card-transaction');
  component.appendChild(transaction);

  const create = document.createElement('button');
  create.textContent = 'Open';
  create.classList.add('account-card-open-button');
  component.appendChild(create);
  create.addEventListener('click', (event) => handleAccountCardDetailClick(event, currentAccount));

  return component;
}
