import {ExchangeRate} from "../api/exchange-rate-schema.ts";
import {MenuType} from "../type/menu-type.ts";
import {SortType} from "../type/sort-type.enum.ts";

interface Store {
  menuStatus: MenuType,
  historyPage: number,
  sortOption: SortType,
  exchangeRate: ExchangeRate[];
}

export const store: Store = {
  menuStatus: MenuType.none,
  historyPage: 0,
  sortOption: SortType.BY_BALANCE,
  exchangeRate: []
}
