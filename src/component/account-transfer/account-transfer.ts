import {Account} from "../../api/account-schema.ts";
import {transferAccountAmount} from "../../api/account.ts";
import {ACCOUNT, TRANSFER_LIST_KEY_NAME} from "../../const.ts";
import {renderAccountPage} from "../../page/account-page/account-page.ts";
import {hideLoader, showLoader} from "../../page/loader-page/loader-page.ts";
import {loadFromLocalStorage, saveToLocalStorage} from "../../service/localstorage.ts";
import {AccountTransferForm, AccountTransferFormSchema} from "./account-transfer-schema.ts";
import './account-transfer.css';

const handleTransferFormSubmit = async (event: SubmitEvent, account: Account) => {
  event.preventDefault();
  const errorDiv = document.querySelector('#error');
  const formData = new FormData(event.target as HTMLFormElement);

  const recipientAccount = formData.get('recipient') as string;
  const formEntries: AccountTransferForm = {
    from: account.account,
    to: recipientAccount,
    amount: Number(formData.get('amount')),
  };

  const validationResult = AccountTransferFormSchema.safeParse(formEntries);
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
    await transferAccountAmount(formEntries);
    const savedNumbers = loadFromLocalStorage<string[]>(TRANSFER_LIST_KEY_NAME) || [];
    savedNumbers.push(recipientAccount)
    saveToLocalStorage(TRANSFER_LIST_KEY_NAME, savedNumbers);

    await hideLoader();
    await renderAccountPage();
  } catch (error) {
    await hideLoader();
    if (errorDiv) {
      errorDiv.textContent = (error as Error).message || 'An unknown error occurred.';
    }
  }
};

export function getAccountTransferComponent(account: Account) {
  const component = document.createElement('div');
  component.classList.add('account-transfer-component');

  const title = document.createElement('p');
  title.textContent = 'New Transaction';
  title.classList.add('account-transfer-title');
  component.appendChild(title);

  const form = document.createElement('form');
  form.classList.add('transfer-form');
  component.appendChild(form);

  const recipientLabel = document.createElement('label');
  recipientLabel.htmlFor = 'recipient';
  recipientLabel.textContent = 'Recipient Account #';
  form.appendChild(recipientLabel);

  const recipientInput = document.createElement('input');
  recipientInput.type = 'text';
  recipientInput.id = 'recipient';
  recipientInput.name = 'recipient';
  recipientInput.placeholder = 'recipient-#';
  recipientInput.setAttribute('list', 'recipient-options');
  recipientInput.setAttribute('autocomplete', 'off');
  form.appendChild(recipientInput);

  const datalist = document.createElement('datalist');
  datalist.id = 'recipient-options';
  form.appendChild(datalist);

  const savedNumbers = loadFromLocalStorage<string[]>(TRANSFER_LIST_KEY_NAME) || [];
  savedNumbers.forEach((number) => {
    const option = document.createElement('option');
    option.value = number;
    datalist.appendChild(option);
  });

  const amountLabel = document.createElement('label');
  amountLabel.htmlFor = 'amount';
  amountLabel.textContent = 'Transfer Amount';
  form.appendChild(amountLabel);

  const amountInput = document.createElement('input');
  amountInput.type = 'number';
  amountInput.min = ACCOUNT.TRANSFER_MIN.toString();
  amountInput.max = ACCOUNT.TRANSFER_MAX.toString();
  amountInput.id = 'amount';
  amountInput.name = 'amount';
  amountInput.placeholder = 'amount';
  form.appendChild(amountInput);

  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error');
  const errorText = document.createElement('p');
  errorText.id = 'error';
  errorDiv.appendChild(errorText);
  form.appendChild(errorDiv);

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'Transfer';
  form.appendChild(submit);
  form.addEventListener('submit', (event) => handleTransferFormSubmit(event, account));

  return component;
}
