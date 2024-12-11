import {BuyCurrencyForm} from "../component/currency-exchange/buy-currency-form-schema.ts";
import {APIRoute, BACKEND_URL} from "../const.ts";
import {getToken} from "../service/token.ts";
import {Account} from "./account-schema.ts";
import {Currency} from "./currency-schema.ts";

export async function getCurrencyList(): Promise<string[]> {
  const token = getToken();
  const response = await fetch(`${BACKEND_URL}${APIRoute.GetCurrencyList}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Get Currency List error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data.payload;
}

export async function getAccountCurrency(): Promise<Currency> {
  const token = getToken();
  const response = await fetch(`${BACKEND_URL}${APIRoute.GetAccountCurrency}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Get Account Currency error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data.payload;
}

export async function buyCurrency(currencyForm: BuyCurrencyForm): Promise<Account> {
  const token = getToken();
  const response = await fetch(`${BACKEND_URL}${APIRoute.BuyAccountCurrency}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify(currencyForm),
  });
  if (!response.ok) {
    throw new Error(`Buy Currency error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data.payload;
}

