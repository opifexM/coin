import {renderLoginPage} from "./page/login-page/login-page.ts";

export async function startApp() {
  await renderLoginPage();
}

export function renderPage(page: HTMLDivElement, isClearPage = true) {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    throw new Error('Error loading app selector');
  }
  if (!page) {
    throw new Error('Error loading page content');
  }

  if (isClearPage) {
    app.innerHTML = '';
  }
  app.appendChild(page);
}


