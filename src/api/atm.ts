import {z} from "zod";
import {APIRoute, BACKEND_URL} from "../const.ts";
import {getToken} from "../service/token.ts";
import {Atm, AtmSchema} from "./atm-schema.ts";

export async function getAtmList(): Promise<Atm[]> {
  const token = getToken();
  const response = await fetch(`${BACKEND_URL}${APIRoute.GetAtmList}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Get Atm List error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();

  return z.array(AtmSchema).parse(data.payload);
}
