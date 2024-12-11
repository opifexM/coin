import {Account} from "../../api/account-schema.ts";
import {getAccountDetail} from "../../api/account.ts";
import {renderPage} from "../../app.ts";
import {getAccountDetailDashboardComponent} from "../../component/account-detail-dashboard/account-detail-dashboard.ts";
import {getAccountHistoryDynamicComponent} from "../../component/account-history-dynamic/account-history-dynamic.ts";
import {getAccountHistoryTableComponent} from "../../component/account-history-table/account-history-table.ts";
import {getAccountTransferComponent} from "../../component/account-transfer/account-transfer.ts";
import {getMenuComponent} from "../../component/menu/menu.ts";
import {store} from "../../store/store.ts";
import {MenuType} from "../../type/menu-type.ts";
import './account-detail-page.css';

export async function renderAccountDetailPage(id: string): Promise<void> {
  store.menuStatus = MenuType.none;
  store.historyPage = 0;
  const account = await getAccountDetail(id);
  renderPage(createAccountDetailPage(account));
}

function createAccountDetailPage(account: Account): HTMLDivElement {
  const page = document.createElement('div');
  page.classList.add('account-detail-page');

  const menuComponent = getMenuComponent(store.menuStatus);
  page.appendChild(menuComponent);

  const accountDetailComponent = getAccountDetailDashboardComponent(account);
  page.appendChild(accountDetailComponent);

  const accountDetailPageAction = document.createElement('div');
  accountDetailPageAction.classList.add('account-detail-page-action');
  page.appendChild(accountDetailPageAction);

  const accountTransferComponent = getAccountTransferComponent(account);
  accountDetailPageAction.appendChild(accountTransferComponent);

  const accountDynamicComponent = getAccountHistoryDynamicComponent(account);
  accountDetailPageAction.appendChild(accountDynamicComponent);

  const accountDetailPageTable = document.createElement('div');
  accountDetailPageTable.classList.add('account-detail-page-table');
  page.appendChild(accountDetailPageTable);

  const accountHistoryTableComponent = getAccountHistoryTableComponent(account);
  accountDetailPageTable.appendChild(accountHistoryTableComponent);

  return page;
}
