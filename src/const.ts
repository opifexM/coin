export const BACKEND_URL = 'http://localhost:3000/';
export const BACKEND_WEBSOCKET_URL = 'ws://localhost:3000/';

export const AUTH_TOKEN_KEY_NAME = 'coin-token';
export const TRANSFER_LIST_KEY_NAME = 'coin-transfers';

export const APIRoute = {
  Login: 'login',
  GetAccountList: 'accounts',
  GetAccountDetail: 'account/:id',
  CreateAccount: 'create-account',
  TransferAccountAmount: 'transfer-funds',
  GetCurrencyList: 'all-currencies',
  GetAccountCurrency: 'currencies',
  BuyAccountCurrency: 'currency-buy',
  GetAtmList: 'banks',
} as const;

export const WebSocketAPIRoute = {
  Currency: 'currency-feed',
} as const;

export const ACCOUNT = {
  TRANSFER_MIN: 1,
  TRANSFER_MAX: 1000000,
  TRANSFER_STEP: 0.01,
  HISTORY_LIMIT: 10,
  HISTORY_EXTEND_LIMIT: 25,
  CHART_TIME_FRAME_MONTH: 6,
  CURRENCY_LIMIT: 21,
} as const;

export const MAP = {
  LAT_DEFAULT: 55.75,
  LON_DEFAULT: 37.61,
  ZOOM_DEFAULT: 10,
  NAME_DEFAULT: 'ATM Coin.'
} as const;
