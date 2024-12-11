import {renderPage} from "../../app.ts";
import {getLoginFormComponent} from "../../component/login-form/login-form.ts";
import {getMenuComponent} from "../../component/menu/menu.ts";
import {dropToken} from "../../service/token.ts";
import {store} from "../../store/store.ts";
import {MenuType} from "../../type/menu-type.ts";

export async function renderLoginPage(): Promise<void> {
  dropToken();
  store.menuStatus = MenuType.logout;
  renderPage(createLoginPage());
}

function createLoginPage(): HTMLDivElement {
  const page = document.createElement('div');
  page.classList.add('login-page');

  const menuComponent = getMenuComponent(MenuType.accounts, true);
  page.appendChild(menuComponent);

  const loginComponent = getLoginFormComponent();
  page.appendChild(loginComponent);

  return page;
}
