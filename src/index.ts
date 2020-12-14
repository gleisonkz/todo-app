import {
  convertFormValuesToObj,
  isEmail,
  isEmpty,
  setInvalidFor,
  setValidFor,
  validateForm,
} from "./functions/form-validations";
import "./style.scss";

const $loginForm: any = document.querySelector("form");
const $loginButton: HTMLButtonElement = $loginForm.querySelector(".form__button");

const [$email, $password]: [HTMLInputElement, HTMLInputElement] = $loginForm;
const $inputs = [...$loginForm.querySelectorAll("input")];

/* ========================================================================== */
/* Monitorando o estado do form */
/* ========================================================================== */

$email.addEventListener("keyup", () => {
  const emailValue = $email.value;
  const expectations = [
    {
      expect: () => emailValue && isEmail(emailValue),
      action: () => setInvalidFor($email, "email inválido"),
    },
    {
      expect: () => isEmpty(emailValue),
      action: () => setInvalidFor($email, `o campo ${$email.name}  é obrigatório`),
    },
    {
      expect: () => true,
      action: () => setValidFor($email),
    },
  ];

  const expected = expectations.find((expectation) => expectation.expect());
  expected.action();
});

$password.addEventListener("keyup", () => {
  const passwordValue = $password.value;
  const expectations = [
    {
      expect: () => passwordValue && $password.value.length < 6,
      action: () => setInvalidFor($password, "mínimo de 6 caracteres"),
    },
    {
      expect: () => isEmpty(passwordValue),
      action: () => setInvalidFor($password, `o campo ${$password.name}  é obrigatório`),
    },
    {
      expect: () => true,
      action: () => setValidFor($password),
    },
  ];

  const expected = expectations.find((expectation) => expectation.expect());
  expected.action();
});

$inputs.forEach(($input) => {
  $input.addEventListener("keyup", () => {
    const formState = validateForm($inputs);
    $loginButton.disabled = !formState;
  });
});

$loginForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const formState = validateForm($inputs);
  if (formState === false) return;

  const userObj = convertFormValuesToObj($loginForm) as UserLogin;
  console.log(userObj);
});

interface UserLogin {
  email: string;
  password: string;
}
