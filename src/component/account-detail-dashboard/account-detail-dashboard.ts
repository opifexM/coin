import {Account} from "../../api/account-schema.ts";
import {renderAccountPage} from "../../page/account-page/account-page.ts";
import './account-detail-dashboard.css';

const handleBackToDashboardClick = async (): Promise<void> => {
  await renderAccountPage();
};

export function getAccountDetailDashboardComponent(currentAccount: Account): HTMLDivElement {
  const {account, balance} = currentAccount;

  const component = document.createElement('div');
  component.classList.add('account-detail-component');

  const controlTop = document.createElement('div');
  controlTop.classList.add('account-detail-control-top');
  component.appendChild(controlTop);

  const title = document.createElement('p');
  title.textContent = 'Account Detail';
  title.classList.add('account-detail-title');
  controlTop.appendChild(title);

  const back = document.createElement('button');
  back.textContent = 'Back to Dashboard';
  back.classList.add('account-detail-button');
  controlTop.appendChild(back);
  back.addEventListener('click', handleBackToDashboardClick);


  const controlBottom = document.createElement('div');
  controlBottom.classList.add('account-detail-control-bottom');
  component.appendChild(controlBottom);

  const accountAmount = document.createElement('p');
  accountAmount.textContent = `# ${account}`;
  accountAmount.classList.add('account-detail-number');
  controlBottom.appendChild(accountAmount);

  const accountBalance = document.createElement('p');
  accountBalance.textContent = 'Balance ';
  accountBalance.classList.add('account-detail-balance');

  const balanceValue = document.createElement('span');
  balanceValue.textContent = `$${balance.toLocaleString()}`;
  accountBalance.appendChild(balanceValue);
  controlBottom.appendChild(accountBalance);

  return component;
}
