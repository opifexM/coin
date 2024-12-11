import {AUTH_TOKEN_KEY_NAME} from "../const.ts";
import {dropCookie, getCookie, saveCookie} from './cookie.ts';

export function getToken(): string {
  return getCookie(AUTH_TOKEN_KEY_NAME);
}

export function saveToken(token: string = ''): void {
  saveCookie(AUTH_TOKEN_KEY_NAME, token);
}

export function dropToken(): void {
  dropCookie(AUTH_TOKEN_KEY_NAME);
}
