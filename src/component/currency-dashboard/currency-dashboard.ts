import './currency-dashboard.css';

export function getCurrencyDashboardComponent(): HTMLDivElement {
  const component = document.createElement('div');
  component.classList.add('currency-component');

  const title = document.createElement('p');
  title.textContent = 'Currency Exchange';
  title.classList.add('currency-title');
  component.appendChild(title);

  return component;
}
