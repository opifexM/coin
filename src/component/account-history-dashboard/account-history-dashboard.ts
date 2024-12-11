import {Account} from "../../api/account-schema.ts";
import {renderAccountDetailPage} from "../../page/account-detail-page/account-detail-page.ts";
import './account-history-dashboard.css';

const handleBackToAccountClick = async (event: MouseEvent, account: Account) => {
  event.preventDefault();
  await renderAccountDetailPage(account.account);
};

export function getAccountHistoryDashboardComponent(currentAccount: Account): HTMLDivElement {
  const {account, balance} = currentAccount;

  const component = document.createElement('div');
  component.classList.add('account-history-component');

  const controlTop = document.createElement('div');
  controlTop.classList.add('account-history-control-top');
  component.appendChild(controlTop);

  const title = document.createElement('p');
  title.textContent = 'Balance History';
  title.classList.add('account-history-title');
  controlTop.appendChild(title);

  const back = document.createElement('button');
  back.textContent = 'Back to Account';
  back.classList.add('account-history-button');
  controlTop.appendChild(back);
  back.addEventListener('click', (event) => handleBackToAccountClick(event, currentAccount));


  const controlBottom = document.createElement('div');
  controlBottom.classList.add('account-history-control-bottom');
  component.appendChild(controlBottom);

  const accountAmount = document.createElement('p');
  accountAmount.textContent = `# ${account}`;
  accountAmount.classList.add('account-history-number');
  controlBottom.appendChild(accountAmount);

  const accountBalance = document.createElement('p');
  accountBalance.textContent = 'Balance ';
  accountBalance.classList.add('account-history-balance');
  const balanceValue = document.createElement('span');
  balanceValue.textContent = `$${balance.toLocaleString()}`;
  accountBalance.appendChild(balanceValue);
  controlBottom.appendChild(accountBalance);

  return component;
}
