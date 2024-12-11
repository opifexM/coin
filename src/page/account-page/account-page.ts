import {Account} from "../../api/account-schema.ts";
import {getAccountList} from "../../api/account.ts";
import {renderPage} from "../../app.ts";
import {getAccountDashboardComponent} from "../../component/account-dashboard/account-dashboard.ts";
import {getAccountListComponent} from "../../component/account-list/acount-list.ts";
import {getMenuComponent} from "../../component/menu/menu.ts";
import {store} from "../../store/store.ts";
import {MenuType} from "../../type/menu-type.ts";

export async function renderAccountPage() {
  store.menuStatus = MenuType.accounts;
  const accounts = await getAccountList();
  renderPage(createAccountPage(accounts));
}

function createAccountPage(accounts: Account[]): HTMLDivElement {
  const page = document.createElement('div');
  page.classList.add('account-page');

  const menuComponent = getMenuComponent(store.menuStatus);
  page.appendChild(menuComponent);

  const dashboardComponent = getAccountDashboardComponent();
  page.appendChild(dashboardComponent);

  const accountListComponent = getAccountListComponent(accounts);
  page.appendChild(accountListComponent);

  return page;
}


