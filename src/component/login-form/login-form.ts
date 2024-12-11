import {authenticateUser} from "../../api/user.ts";
import {renderAccountPage} from "../../page/account-page/account-page.ts";
import {hideLoader, showLoader} from "../../page/loader-page/loader-page.ts";
import {LoginForm, LoginFormSchema} from "./login-form-schema.ts";
import './login-page.css';

const handleLoginFormSubmit = async (event: SubmitEvent): Promise<void> => {
  event.preventDefault();
  const errorDiv = document.querySelector('#error');
  const formData = new FormData(event.target as HTMLFormElement);

  const formEntries: LoginForm = {
    login: formData.get('login') as string,
    password: formData.get('password') as string
  };

  const validationResult = LoginFormSchema.safeParse(formEntries);
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
    await authenticateUser(formEntries);
    await hideLoader();
    await renderAccountPage();
  } catch (error) {
    await hideLoader();
    if (errorDiv) {
      errorDiv.textContent = (error as Error).message || 'An unknown error occurred.';
    }
  }
};

export function getLoginFormComponent(): HTMLDivElement {
  const component = document.createElement('div');
  component.classList.add('login-form-component');

  const frame = document.createElement('div');
  frame.classList.add('login-form-frame');
  component.appendChild(frame);

  const title = document.createElement('p');
  title.classList.add('login-form-title');
  title.textContent = 'Log in to your account';
  component.appendChild(title);

  const form = document.createElement('form');
  form.classList.add('login-form');
  component.appendChild(form);

  const loginLabel = document.createElement('label');
  loginLabel.htmlFor = 'login';
  loginLabel.textContent = 'Login:';
  form.appendChild(loginLabel);

  const loginInput = document.createElement('input');
  loginInput.type = 'text';
  loginInput.id = 'login';
  loginInput.name = 'login';
  loginInput.placeholder = 'your-login-page-form';
  form.appendChild(loginInput);

  const passwordLabel = document.createElement('label');
  passwordLabel.htmlFor = 'password';
  passwordLabel.textContent = 'Password:';
  form.appendChild(passwordLabel);

  const passwordInput = document.createElement('input');
  passwordInput.type = 'text';
  passwordInput.id = 'password';
  passwordInput.name = 'password';
  passwordInput.placeholder = 'your-password';
  form.appendChild(passwordInput);

  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error');
  const errorText = document.createElement('p');
  errorText.id = 'error';
  errorDiv.appendChild(errorText);
  form.appendChild(errorDiv);

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'Login';
  form.appendChild(submit);
  form.addEventListener('submit', handleLoginFormSubmit);

  return component;
}
