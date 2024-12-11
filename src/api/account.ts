import {z} from "zod";
import {AccountTransferForm} from "../component/account-transfer/account-transfer-schema.ts";
import {APIRoute, BACKEND_URL} from "../const.ts";
import {getToken} from "../service/token.ts";
import {Account, AccountSchema} from "./account-schema.ts";

export async function getAccountList(): Promise<Account[]> {
  const token = getToken();
  const response = await fetch(`${BACKEND_URL}${APIRoute.GetAccountList}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Get Account error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();

  return z.array(AccountSchema).parse(data.payload);
}

export async function createAccount(): Promise<Account> {
  const token = getToken();
  const response = await fetch(`${BACKEND_URL}${APIRoute.CreateAccount}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Create Account error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.payload) {
    throw new Error(`Create Account error: ${data.error}`);
  }

  return AccountSchema.parse(data.payload);
}

export async function getAccountDetail(id: string): Promise<Account> {
  const token = getToken();
  const url = APIRoute.GetAccountDetail.replace(':id', id);
  const response = await fetch(`${BACKEND_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Get Account Detail error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();

  return AccountSchema.parse(data.payload);
}

export async function transferAccountAmount(transferForm: AccountTransferForm): Promise<Account> {
  const token = getToken();
  const response = await fetch(`${BACKEND_URL}${APIRoute.TransferAccountAmount}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify(transferForm),
  });
  if (!response.ok) {
    throw new Error(`Transfer Amount error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.payload) {
    throw new Error(`Transfer Amount error: ${data.error}`);
  }

  return AccountSchema.parse(data.payload);
}
