import './loader.css';
import {renderPage} from "../../app.ts";

const LOADER_STEPS = 12;
const LOADER_TIMEOUT = 1000;

function createLoader(): HTMLDivElement {
  const container = document.createElement('div');
  container.classList.add('loader-container');

  const loaderSpinner = document.createElement('div');
  loaderSpinner.classList.add('loader-spinner');
  container.appendChild(loaderSpinner);

  for (let i = 1; i <= LOADER_STEPS; i++) {
    const stick = document.createElement('div');
    stick.classList.add('loader__stick');
    stick.style.setProperty('--i', i.toString());
    loaderSpinner.appendChild(stick);
  }

  return container;
}

function getLoaderPage(): HTMLDivElement {
  let page = document.querySelector<HTMLDivElement>('.loader-container');
  if (!page) {
    renderPage(createLoader(), false);
    page = document.querySelector<HTMLDivElement>('.loader-container');
  }
  if (!page) {
    throw new Error('Failed to render and find the loader page');
  }

  return page;
}

export function showLoader(): void {
  const page = getLoaderPage();
  page.style.display = 'flex';
}

export async function hideLoader(): Promise<void> {
  const page = getLoaderPage();
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      page.style.display = 'none';
      resolve();
    }, LOADER_TIMEOUT);
  });
}
