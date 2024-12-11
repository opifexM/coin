import {Atm} from "../../api/atm-schema.ts";
import {getAtmList} from "../../api/atm.ts";
import {renderPage} from "../../app.ts";
import {getAtmDashboardComponent} from "../../component/atm-dashboard/atm-dashboard.ts";
import {getAtmMapComponent} from "../../component/atm-map/atm-map.ts";
import {getMenuComponent} from "../../component/menu/menu.ts";
import {store} from "../../store/store.ts";
import {MenuType} from "../../type/menu-type.ts";
import './atm-page.css';

export async function renderAtmPage() {
  store.menuStatus = MenuType.atm;
  const atms = await getAtmList();
  renderPage(createAtmPage(atms));
}

function createAtmPage(atms: Atm[]): HTMLDivElement {
  const page = document.createElement('div');
  page.classList.add('atm-page');

  const menuComponent = getMenuComponent(store.menuStatus);
  page.appendChild(menuComponent);

  const atmComponent = getAtmDashboardComponent();
  page.appendChild(atmComponent);

  const atmPageAction = document.createElement('div');
  atmPageAction.classList.add('atm-page-action');
  page.appendChild(atmPageAction);

  const accountCurrencyComponent = getAtmMapComponent(atms);
  atmPageAction.appendChild(accountCurrencyComponent);

  return page;
}
