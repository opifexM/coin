import './atm-dashboard.css';

export function getAtmDashboardComponent(): HTMLDivElement {
  const component = document.createElement('div');
  component.classList.add('atm-component');

  const title = document.createElement('p');
  title.textContent = 'ATM Map';
  title.classList.add('atm-title');
  component.appendChild(title);

  return component;
}
