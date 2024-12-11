import {buyCurrency} from "../../api/currency.ts";
import {ACCOUNT} from "../../const.ts";
import {renderCurrencyPage} from "../../page/currency-page/currency-page.ts";
import {hideLoader, showLoader} from "../../page/loader-page/loader-page.ts";
import {BuyCurrencyForm, BuyCurrencyFormSchema} from "./buy-currency-form-schema.ts";
import './currency-exchange.css';

const handleBuyCurrencyFormSubmit = async (event: SubmitEvent): Promise<void> => {
  event.preventDefault();
  const errorDiv = document.querySelector('#error');
  const formData = new FormData(event.target as HTMLFormElement);

  const formEntries: BuyCurrencyForm = {
    from: formData.get('from') as string,
    to: formData.get('to') as string,
    amount: Number(formData.get('amount')),
  };

  const validationResult = BuyCurrencyFormSchema.safeParse(formEntries);
  if (!validationResult.success) {
    if (errorDiv) {
      const errorMessages = validationResult.error.errors
        .map((err) => err.message)
        .join(', ');
      errorDiv.textContent = `Validation error: ${errorMessages}`;
    }
    return;
  }
  showLoader();

  try {
    await buyCurrency(formEntries);
    await hideLoader();
    await renderCurrencyPage();
  } catch (error) {
    await hideLoader();
    if (errorDiv) {
      errorDiv.textContent = (error as Error).message || 'An unknown error occurred.';
    }
  }
};

export function getCurrencyExchangeComponent(currencies: string[]): HTMLDivElement {
  const component = document.createElement('div');
  component.classList.add('currency-exchange');

  const frame = document.createElement('div');
  frame.classList.add('currency-exchange-frame');
  component.appendChild(frame);

  const title = document.createElement('p');
  title.classList.add('currency-exchange-title');
  title.textContent = 'Currency exchange';
  component.appendChild(title);

  const form = document.createElement('form');
  form.classList.add('currency-exchange-form');
  component.appendChild(form);

  const rowFirst = document.createElement('div');
  rowFirst.classList.add('currency-exchange-row-first');
  form.appendChild(rowFirst);

  const fromLabel = document.createElement('label');
  fromLabel.htmlFor = 'from';
  fromLabel.textContent = 'From';
  fromLabel.classList.add('currency-exchange-label');
  rowFirst.appendChild(fromLabel);

  const fromSelect = document.createElement('select');
  fromSelect.id = 'from';
  fromSelect.name = 'from';
  fromSelect.classList.add('currency-exchange-select');
  rowFirst.appendChild(fromSelect);

  currencies.forEach((currency) => {
    const option = document.createElement('option');
    option.value = currency;
    option.textContent = currency;
    fromSelect.appendChild(option);
  });

  const toLabel = document.createElement('label');
  toLabel.htmlFor = 'to';
  toLabel.textContent = 'To';
  toLabel.classList.add('currency-exchange-label');
  rowFirst.appendChild(toLabel);

  const toSelect = document.createElement('select');
  toSelect.id = 'to';
  toSelect.name = 'to';
  toSelect.classList.add('currency-exchange-select');
  rowFirst.appendChild(toSelect);

  currencies.forEach((currency) => {
    const option = document.createElement('option');
    option.value = currency;
    option.textContent = currency;
    toSelect.appendChild(option);
  });

  const rowSecond = document.createElement('div');
  rowSecond.classList.add('currency-exchange-row-second');
  form.appendChild(rowSecond);

  const amountLabel = document.createElement('label');
  amountLabel.htmlFor = 'amount';
  amountLabel.textContent = 'Amount';
  rowSecond.appendChild(amountLabel);

  const amountInput = document.createElement('input');
  amountInput.type = 'number';
  amountInput.step = ACCOUNT.TRANSFER_STEP.toString();
  amountInput.min = ACCOUNT.TRANSFER_MIN.toString();
  amountInput.max = ACCOUNT.TRANSFER_MAX.toString();
  amountInput.id = 'amount';
  amountInput.name = 'amount';
  amountInput.placeholder = 'amount';
  rowSecond.appendChild(amountInput);

  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error');
  const errorText = document.createElement('p');
  errorText.id = 'error';
  errorDiv.appendChild(errorText);
  form.appendChild(errorDiv);

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'Exchange';
  submit.classList.add('currency-exchange-submit');
  form.appendChild(submit);
  form.addEventListener('submit', handleBuyCurrencyFormSubmit);

  return component;
}
