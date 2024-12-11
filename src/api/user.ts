import {LoginForm} from "../component/login-form/login-form-schema.ts";
import {APIRoute, BACKEND_URL} from "../const.ts";
import {dropToken, saveToken} from "../service/token.ts";

export async function authenticateUser(login: LoginForm): Promise<string> {
  dropToken();

  const response = await fetch(`${BACKEND_URL}${APIRoute.Login}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login),
  });
  if (!response.ok) {
    throw new Error(`Client login error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.payload) {
    throw new Error(`Client login error: ${data.error}`);
  }

  saveToken(data.payload.token);

  return data.payload;
}
