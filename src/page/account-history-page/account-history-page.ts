import {Account} from "../../api/account-schema.ts";
import {renderPage} from "../../app.ts";
import {
  getAccountHistoryDashboardComponent
} from "../../component/account-history-dashboard/account-history-dashboard.ts";
import {getAccountHistoryDynamicComponent} from "../../component/account-history-dynamic/account-history-dynamic.ts";
import {getAccountHistoryRatioComponent} from "../../component/account-history-ratio/account-history-ratio.ts";
import {getAccountHistoryTableComponent} from "../../component/account-history-table/account-history-table.ts";
import {getMenuComponent} from "../../component/menu/menu.ts";
import {store} from "../../store/store.ts";
import {MenuType} from "../../type/menu-type.ts";
import './account-history-page.css';

export async function renderAccountHistoryPage(account: Account): Promise<void> {
  store.menuStatus = MenuType.none;
  renderPage(createAccountDetailPage(account));
}

function createAccountDetailPage(account: Account): HTMLDivElement {
  const page = document.createElement('div');
  page.classList.add('account-history-page');

  const menuComponent = getMenuComponent(store.menuStatus);
  page.appendChild(menuComponent);

  const accountHistoryComponent = getAccountHistoryDashboardComponent(account);
  page.appendChild(accountHistoryComponent);

  const accountDetailAction = document.createElement('div');
  accountDetailAction.classList.add('account-history-action');
  page.appendChild(accountDetailAction);

  const accountDynamicComponent = getAccountHistoryDynamicComponent(account, true);
  accountDetailAction.appendChild(accountDynamicComponent);

  const accountHistoryRatioComponent = getAccountHistoryRatioComponent(account);
  accountDetailAction.appendChild(accountHistoryRatioComponent);

  const accountHistoryTableComponent = getAccountHistoryTableComponent(account, true);
  accountDetailAction.appendChild(accountHistoryTableComponent);

  return page;
}
